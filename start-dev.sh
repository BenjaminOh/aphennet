#!/bin/bash

# 개발환경 시작 스크립트

echo "=== 개발환경 시작 ==="

# .env.dev를 .env로 복사
cp .env.dev .env

# 개발환경으로 컨테이너 시작
docker-compose -f docker-compose.dev.yml down & docker-compose -f docker-compose.dev.yml up -d --build

echo "=== 개발환경이 시작되었습니다 ==="
echo "접속 URL: http://localhost:3000"
echo "API URL: http://localhost:3001"
