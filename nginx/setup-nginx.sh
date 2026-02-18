#!/bin/bash

# =============================================================================
# Nginx Domain Mapping Setup for aphen.net / api.aphen.net
# =============================================================================
# 서버에서 실행: bash nginx/setup-nginx.sh
# =============================================================================
set -e

NGINX_CONF_DIR="/root/deploy/nginx-waf/conf.d"
NGINX_CONTAINER="nginx-waf-blue"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "=== Nginx Domain Mapping Setup ==="
echo ""

# -----------------------------------------------------------------------------
# Step 1. inc 파일 복사 (Blue-Green 변수)
# -----------------------------------------------------------------------------
echo "[1/5] Copying aphennet-service-url.inc..."
if [ ! -f "$NGINX_CONF_DIR/aphennet-service-url.inc" ]; then
    cp "$SCRIPT_DIR/conf.d/aphennet-service-url.inc" "$NGINX_CONF_DIR/"
    echo "  Created aphennet-service-url.inc (initial: blue)"
else
    echo "  aphennet-service-url.inc already exists - skipping (deploy.sh manages this)"
fi

# -----------------------------------------------------------------------------
# Step 2. 프론트엔드 server block 복사 — aphen.net.conf
# -----------------------------------------------------------------------------
echo "[2/5] Copying aphen.net.conf..."
cp "$SCRIPT_DIR/conf.d/aphen.net.conf" "$NGINX_CONF_DIR/"
echo "  Created aphen.net.conf"

# -----------------------------------------------------------------------------
# Step 3. API server block 복사 — api.aphen.net.conf
# -----------------------------------------------------------------------------
echo "[3/5] Copying api.aphen.net.conf..."
cp "$SCRIPT_DIR/conf.d/api.aphen.net.conf" "$NGINX_CONF_DIR/"
echo "  Created api.aphen.net.conf"

# -----------------------------------------------------------------------------
# Step 4. Nginx 설정 테스트
# -----------------------------------------------------------------------------
echo "[4/5] Testing Nginx configuration..."
if ! docker exec "$NGINX_CONTAINER" nginx -t 2>&1; then
    echo ""
    echo "ERROR: Nginx config test failed!"
    echo ""
    echo "SSL 인증서 경로를 확인하세요:"
    echo "  docker exec $NGINX_CONTAINER ls /etc/nginx/ssl/live/"
    echo ""
    echo "와일드카드 인증서(*.aphen.net) 사용 시, conf 파일의 ssl_certificate 경로를 수정하세요."
    exit 1
fi

# -----------------------------------------------------------------------------
# Step 5. Nginx 리로드 (무중단)
# -----------------------------------------------------------------------------
echo "[5/5] Reloading Nginx..."
docker exec "$NGINX_CONTAINER" nginx -s reload
echo "  Nginx reloaded successfully"

echo ""
echo "=============================================="
echo " Setup complete!"
echo ""
echo " Verify:"
echo "   curl -I https://aphen.net"
echo "   curl -I https://api.aphen.net/health"
echo "   curl -I http://aphen.net  (should 301)"
echo "=============================================="
