#!/bin/bash

# 개발환경 시작 스크립트

echo "=== 개발환경 시작 ==="

# .env.dev를 .env로 복사
cp .env.dev .env

# nginx 설정을 HTTP로 설정
cp nginx/nginx.template.conf nginx/nginx.conf

# 개발환경으로 컨테이너 시작
docker-compose -f docker-compose.base.yml -f docker-compose.dev.yml up -d

echo "=== 개발환경이 시작되었습니다 ==="
echo "접속 URL: http://aphennet.likeweb.co.kr"
echo "API URL: http://aphennetapi.likeweb.co.kr:3001"
