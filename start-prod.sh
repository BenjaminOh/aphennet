#!/bin/bash

# 운영환경 시작 스크립트

echo "=== 운영환경 시작 ==="

# .env.prod를 .env로 복사
cp .env.prod .env

# 운영환경으로 컨테이너 시작
docker-compose -f docker-compose.prod.yml up -d

echo "=== 운영환경이 시작되었습니다 ==="
echo "접속 URL: http://aphennet.likeweb.co.kr:3000"
echo "API URL: http://aphennetapi.likeweb.co.kr:3001" 