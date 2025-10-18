#!/bin/bash

# 운영서버 배포 스크립트
set -e  # 에러 발생 시 스크립트 중단

echo "=== 운영서버 배포 시작 ==="

# 1. 환경변수 설정
echo "### 환경변수 설정 중..."
if [ -f .env.prod ]; then
    cp .env.prod .env
    echo "✅ .env.prod 파일을 .env로 복사했습니다."
else
    echo "⚠️  .env.prod 파일이 없습니다. 기존 .env 파일을 사용합니다."
fi

# 2. 기존 컨테이너 중지
echo "### 기존 컨테이너 중지 중..."
docker compose -f docker-compose.prod.yml down
echo "✅ 기존 컨테이너가 중지되었습니다."

# 3. 최신 이미지 빌드
echo "### 이미지 빌드 중..."
docker compose -f docker-compose.prod.yml build --no-cache
echo "✅ 이미지 빌드가 완료되었습니다."

# 4. 운영환경 시작
echo "### 운영환경 시작 중..."
docker compose -f docker-compose.prod.yml up -d
echo "✅ 모든 컨테이너가 시작되었습니다."

# 5. 상태 확인
echo "### 배포 완료! 상태 확인 중..."
sleep 10

echo ""
echo "=== 컨테이너 상태 ==="
docker compose -f docker-compose.prod.yml ps

echo ""
echo "=== 서비스 상태 확인 ==="
echo "🔍 Next.js 컨테이너 로그 (최근 5줄):"
docker logs aphennet-nextjs --tail=5 2>/dev/null || echo "Next.js 컨테이너가 아직 시작되지 않았습니다."

echo ""
echo "🔍 Node.js 컨테이너 로그 (최근 5줄):"
docker logs aphennet-nodejs --tail=5 2>/dev/null || echo "Node.js 컨테이너가 아직 시작되지 않았습니다."

echo ""
echo "=== 배포 완료! ==="
echo "🌐 프론트엔드: http://aphennet.likeweb.co.kr:3000"
echo "🔌 API: http://aphennetapi.likeweb.co.kr:3001"
echo ""
echo "📋 유용한 명령어:"
echo "  - 컨테이너 상태 확인: docker compose -f docker-compose.prod.yml ps"
echo "  - 로그 확인: docker logs [컨테이너명] --tail=20"
