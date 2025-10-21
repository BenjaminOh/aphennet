#!/bin/bash

# 운영서버 빠른 재시작 스크립트 (빌드 없이)
set -e

echo "=== 운영서버 빠른 재시작 ==="

# .env.dev를 .env로 복사
cp .env.prod .env

# 1. 기존 컨테이너 중지
echo "### 기존 컨테이너 중지 중..."
docker compose -f docker-compose.prod.yml down
echo "✅ 기존 컨테이너가 중지되었습니다."

# 2. 컨테이너 재시작 (빌드 없이)
echo "### 컨테이너 재시작 중..."
docker compose -f docker-compose.prod.yml up -d --build
echo "✅ 모든 컨테이너가 재시작되었습니다."

# 3. nginx 재시작 (중요!)
echo "### nginx 재시작 중..."
cd ../nginxcertbot/infrastructure
docker compose -f docker-compose.prod.yml restart nginx
echo "✅ nginx가 재시작되었습니다."

# 4. 상태 확인
echo "### 상태 확인 중..."
sleep 5

echo ""
echo "=== 컨테이너 상태 ==="
docker compose -f docker-compose.prod.yml ps

echo ""
echo "=== 재시작 완료! ==="
echo "🌐 프론트엔드: https://aphen.net"
echo "🔌 API: https://api.aphen.net"
