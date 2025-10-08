#!/bin/bash

# 운영환경 시작 스크립트

echo "=== 운영환경 시작 ==="

# .env.prod를 .env로 복사
cp .env.prod .env

# nginx 설정을 HTTPS로 설정 (SSL 인증서 필요)
echo "### SSL 인증서 확인 중..."
if [ ! -f "./certbot/conf/live/aphennet.likeweb.co.kr/fullchain.pem" ]; then
    echo "### SSL 인증서가 없습니다. 인증서를 발급합니다..."
    ./certbot/init-letsencrypt.sh
fi

# 운영환경으로 컨테이너 시작
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml up -d

echo "=== 운영환경이 시작되었습니다 ==="
echo "접속 URL: https://aphennet.likeweb.co.kr"
echo "API URL: https://aphennetapi.likeweb.co.kr"
