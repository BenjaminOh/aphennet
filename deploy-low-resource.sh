#!/bin/bash

# 저사양 서버용 배포 스크립트 (1GB RAM)

echo "=== 저사양 서버 배포 시작 ==="

# 1. 환경변수 설정
echo "### 환경변수 설정 중..."
cp .env.prod .env

# 2. 기존 컨테이너 중지
echo "### 기존 컨테이너 중지 중..."
docker compose -f docker-compose.low-resource.yml down

# 3. Docker 정리 (메모리 확보)
echo "### Docker 정리 중..."
docker system prune -f
docker volume prune -f

# 4. 단계별 서비스 시작
echo "### 1단계: MariaDB 시작..."
docker compose -f docker-compose.low-resource.yml up -d mariadb
sleep 30

echo "### 2단계: Node.js 시작..."
docker compose -f docker-compose.low-resource.yml up -d nodejs
sleep 20

echo "### 3단계: Next.js 시작..."
docker compose -f docker-compose.low-resource.yml up -d nextjs
sleep 20

# 5. 상태 확인
echo "### 배포 완료! 상태 확인 중..."
sleep 10
docker compose -f docker-compose.low-resource.yml ps

echo "=== 저사양 서버 배포 완료 ==="
echo "접속 URL: http://aphennet.likeweb.co.kr:3000"
echo "API URL: http://aphennetapi.likeweb.co.kr:3001"
echo ""
echo "메모리 사용량:"
docker stats --no-stream --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"
