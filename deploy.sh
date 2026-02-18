#!/bin/bash

# =============================================================================
# Aphennet Blue-Green Deployment Script
# =============================================================================
set -e

COMPOSE_FILE="docker-compose.prod.yml"
NGINX_INC_PATH="/root/deploy/nginx-waf/conf.d/aphennet-service-url.inc"
NGINX_CONTAINER="nginx-waf-blue"

# -----------------------------------------------------------------------------
# 1. Load .env.prod
# -----------------------------------------------------------------------------
echo "=== [1/10] Loading .env.prod ==="
if [ ! -f .env.prod ]; then
    echo "ERROR: .env.prod not found"
    exit 1
fi
set -a
source .env.prod
set +a
echo "Loaded .env.prod"

# -----------------------------------------------------------------------------
# 2. Detect current color
# -----------------------------------------------------------------------------
echo ""
echo "=== [2/10] Detecting current color ==="

CURRENT_COLOR=""
if docker ps --format '{{.Names}}' | grep -q "aphennet_api_blue"; then
    CURRENT_COLOR="blue"
elif docker ps --format '{{.Names}}' | grep -q "aphennet_api_green"; then
    CURRENT_COLOR="green"
fi

if [ -z "$CURRENT_COLOR" ]; then
    echo "No running aphennet containers found. Defaulting to blue."
    TARGET_COLOR="blue"
else
    echo "Current color: $CURRENT_COLOR"
    if [ "$CURRENT_COLOR" = "blue" ]; then
        TARGET_COLOR="green"
    else
        TARGET_COLOR="blue"
    fi
fi
echo "Target color: $TARGET_COLOR"

# Set ports based on target color
if [ "$TARGET_COLOR" = "blue" ]; then
    API_PORT=$BLUE_API_PORT
    WEB_PORT=$BLUE_WEB_PORT
else
    API_PORT=$GREEN_API_PORT
    WEB_PORT=$GREEN_WEB_PORT
fi
echo "API_PORT=$API_PORT, WEB_PORT=$WEB_PORT"

# -----------------------------------------------------------------------------
# 3. Clean up target color containers
# -----------------------------------------------------------------------------
echo ""
echo "=== [3/10] Cleaning up target color ($TARGET_COLOR) containers ==="

if docker ps -a --format '{{.Names}}' | grep -q "aphennet_.*_${TARGET_COLOR}"; then
    echo "Stopping existing $TARGET_COLOR containers..."
    docker compose -p "aphennet-${TARGET_COLOR}" -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true
fi
echo "Cleanup complete"

# -----------------------------------------------------------------------------
# 4. Check port availability
# -----------------------------------------------------------------------------
echo ""
echo "=== [4/10] Checking port availability ==="

check_port() {
    local port=$1
    if ss -tlnp 2>/dev/null | grep -q ":${port} " || netstat -tlnp 2>/dev/null | grep -q ":${port} "; then
        echo "ERROR: Port $port is already in use"
        ss -tlnp 2>/dev/null | grep ":${port} " || netstat -tlnp 2>/dev/null | grep ":${port} "
        exit 1
    fi
    echo "Port $port is available"
}

check_port "$API_PORT"
check_port "$WEB_PORT"

# -----------------------------------------------------------------------------
# 5. Generate color-specific .env file
# -----------------------------------------------------------------------------
echo ""
echo "=== [5/10] Generating .env file ==="

cp .env.prod .env

cat >> .env << EOF

# Blue-Green deployment variables
COLOR=${TARGET_COLOR}
API_PORT=${API_PORT}
WEB_PORT=${WEB_PORT}
BUILD_TIME=$(date '+%Y-%m-%d %H:%M:%S')
GIT_COMMIT=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
EOF

echo "Generated .env with COLOR=$TARGET_COLOR"

# -----------------------------------------------------------------------------
# 6. Build and start containers
# -----------------------------------------------------------------------------
echo ""
echo "=== [6/10] Building and starting $TARGET_COLOR containers ==="

docker compose -p "aphennet-${TARGET_COLOR}" -f "$COMPOSE_FILE" up -d --build
echo "Containers started"

# -----------------------------------------------------------------------------
# 7. API health check
# -----------------------------------------------------------------------------
echo ""
echo "=== [7/10] API health check (max 90s) ==="

API_URL="http://localhost:${API_PORT}/health"
ELAPSED=0
MAX_WAIT=90
INTERVAL=5

while [ $ELAPSED -lt $MAX_WAIT ]; do
    if curl -sf "$API_URL" > /dev/null 2>&1; then
        echo "API health check passed (${ELAPSED}s)"
        break
    fi
    echo "Waiting for API... (${ELAPSED}s / ${MAX_WAIT}s)"
    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))
done

if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo "ERROR: API health check failed after ${MAX_WAIT}s"
    echo "Rolling back - stopping $TARGET_COLOR containers..."
    docker compose -p "aphennet-${TARGET_COLOR}" -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true
    echo "API container logs:"
    docker logs "aphennet_api_${TARGET_COLOR}" --tail=30 2>/dev/null || true
    exit 1
fi

# -----------------------------------------------------------------------------
# 8. Web health check
# -----------------------------------------------------------------------------
echo ""
echo "=== [8/10] Web health check (max 60s) ==="

WEB_URL="http://localhost:${WEB_PORT}"
ELAPSED=0
MAX_WAIT=60

while [ $ELAPSED -lt $MAX_WAIT ]; do
    HTTP_CODE=$(curl -sf -o /dev/null -w "%{http_code}" "$WEB_URL" 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
        echo "Web health check passed (${ELAPSED}s, HTTP $HTTP_CODE)"
        break
    fi
    echo "Waiting for Web... (${ELAPSED}s / ${MAX_WAIT}s, HTTP $HTTP_CODE)"
    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))
done

if [ $ELAPSED -ge $MAX_WAIT ]; then
    echo "ERROR: Web health check failed after ${MAX_WAIT}s"
    echo "Rolling back - stopping $TARGET_COLOR containers..."
    docker compose -p "aphennet-${TARGET_COLOR}" -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true
    echo "Web container logs:"
    docker logs "aphennet_web_${TARGET_COLOR}" --tail=30 2>/dev/null || true
    exit 1
fi

# -----------------------------------------------------------------------------
# 9. Switch Nginx traffic
# -----------------------------------------------------------------------------
echo ""
echo "=== [9/10] Switching Nginx traffic to $TARGET_COLOR ==="

cat > "$NGINX_INC_PATH" << EOF
set \$aphennet_web_url http://aphennet_web_${TARGET_COLOR}:3000;
set \$aphennet_api_url http://aphennet_api_${TARGET_COLOR}:3000;
EOF

echo "Updated $NGINX_INC_PATH"

docker exec "$NGINX_CONTAINER" nginx -t 2>&1
if [ $? -ne 0 ]; then
    echo "ERROR: Nginx config test failed. Restoring previous config..."
    if [ -n "$CURRENT_COLOR" ]; then
        cat > "$NGINX_INC_PATH" << EOF
set \$aphennet_web_url http://aphennet_web_${CURRENT_COLOR}:3000;
set \$aphennet_api_url http://aphennet_api_${CURRENT_COLOR}:3000;
EOF
    fi
    exit 1
fi

docker exec "$NGINX_CONTAINER" nginx -s reload
echo "Nginx reloaded - traffic now routing to $TARGET_COLOR"

# -----------------------------------------------------------------------------
# 10. Stop previous color
# -----------------------------------------------------------------------------
echo ""
echo "=== [10/10] Cleaning up previous color ==="

if [ -n "$CURRENT_COLOR" ] && [ "$CURRENT_COLOR" != "$TARGET_COLOR" ]; then
    echo "Stopping $CURRENT_COLOR containers..."
    docker compose -p "aphennet-${CURRENT_COLOR}" -f "$COMPOSE_FILE" down --remove-orphans 2>/dev/null || true
    echo "$CURRENT_COLOR containers stopped"
else
    echo "No previous color to clean up"
fi

# Clean up unused images
echo "Pruning unused images..."
docker image prune -f --filter "label=com.docker.compose.project=aphennet-${CURRENT_COLOR}" 2>/dev/null || true

echo ""
echo "=============================================="
echo " Deployment complete!"
echo " Active color: $TARGET_COLOR"
echo " API: http://localhost:${API_PORT}/health"
echo " Web: http://localhost:${WEB_PORT}"
echo "=============================================="
