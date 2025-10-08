#!/bin/bash

# SSL 인증서 재발급 스크립트
set -e

echo "=== SSL 인증서 재발급 시작 ==="

# 1. 기존 인증서 삭제
echo "### 기존 SSL 인증서 삭제 중..."
sudo rm -rf certbot/conf/live/aphennet.likeweb.co.kr
sudo rm -rf certbot/conf/archive/aphennet.likeweb.co.kr
sudo rm -rf certbot/conf/renewal/aphennet.likeweb.co.kr.conf
echo "✅ 기존 인증서가 삭제되었습니다."

# 2. 컨테이너 중지
echo "### 컨테이너 중지 중..."
docker compose -f docker-compose.base.yml -f docker-compose.prod.yml down
echo "✅ 모든 컨테이너가 중지되었습니다."

# 3. nginx만 먼저 시작 (HTTP로)
echo "### nginx 시작 중 (HTTP 모드)..."
docker compose -f docker-compose.base.yml -f docker-compose.prod.yml up -d nginx
echo "✅ nginx가 시작되었습니다."

# 4. nginx가 완전히 시작될 때까지 대기
echo "### nginx 시작 대기 중..."
sleep 10

# 5. SSL 인증서 발급
echo "### SSL 인증서 발급 중..."
./certbot/init-letsencrypt.sh

# 6. 모든 서비스 시작
echo "### 모든 서비스 시작 중..."
docker compose -f docker-compose.base.yml -f docker-compose.prod.yml up -d
echo "✅ 모든 서비스가 시작되었습니다."

# 7. 상태 확인
echo "### 상태 확인 중..."
sleep 10

echo ""
echo "=== 컨테이너 상태 ==="
docker compose -f docker-compose.base.yml -f docker-compose.prod.yml ps

echo ""
echo "=== SSL 인증서 상태 ==="
ls -la certbot/conf/live/aphennet.likeweb.co.kr/

echo ""
echo "=== SSL 재발급 완료! ==="
echo "🌐 프론트엔드: https://aphennet.likeweb.co.kr"
echo "🔌 API: https://aphennetapi.likeweb.co.kr"
echo ""
echo "📋 SSL 테스트 명령어:"
echo "  - SSL 인증서 확인: openssl s_client -connect aphennet.likeweb.co.kr:443 -servername aphennet.likeweb.co.kr"
echo "  - SSL 인증서 확인: openssl s_client -connect aphennetapi.likeweb.co.kr:443 -servername aphennetapi.likeweb.co.kr"
