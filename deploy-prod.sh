#!/bin/bash

# 운영서버 배포 스크립트

echo "=== 운영서버 배포 시작 ==="

# 1. 환경변수 설정
echo "### 환경변수 설정 중..."
cp .env.prod .env

# 2. 기존 컨테이너 중지
echo "### 기존 컨테이너 중지 중..."
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml down

# 3. 최신 이미지 빌드
echo "### 이미지 빌드 중..."
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml build --no-cache

# 4. SSL 인증서 확인
echo "### SSL 인증서 확인 중..."
if [ ! -f "./certbot/conf/live/aphennet.likeweb.co.kr/fullchain.pem" ]; then
    echo "### SSL 인증서가 없습니다. 발급합니다..."
    ./certbot/init-letsencrypt.sh
fi

# 5. 운영환경 시작
echo "### 운영환경 시작 중..."
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml up -d

# 6. 상태 확인
echo "### 배포 완료! 상태 확인 중..."
sleep 10
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml ps

echo "=== 운영서버 배포 완료 ==="
echo "접속 URL: https://aphennet.likeweb.co.kr"
echo "API URL: https://aphennetapi.likeweb.co.kr"
