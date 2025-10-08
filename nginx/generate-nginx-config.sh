#!/bin/bash

# nginx 설정 생성 스크립트

# .env 파일에서 환경변수 로드
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
    echo "### .env 파일에서 환경변수를 로드했습니다."
else
    echo "### 경고: .env 파일을 찾을 수 없습니다. 기본값을 사용합니다."
fi

# 환경변수 설정 (기본값 포함)
USE_SSL=${USE_SSL:-false}
NGINX_SERVER_NAME=${NGINX_SERVER_NAME:-aphennet.likeweb.co.kr}

echo "### nginx 설정 생성 중..."
echo "### USE_SSL: $USE_SSL"
echo "### NGINX_SERVER_NAME: $NGINX_SERVER_NAME"

# nginx 설정 파일 생성
envsubst '${NGINX_SERVER_NAME}' < nginx.template.conf > nginx.conf

echo "### nginx.conf 파일이 생성되었습니다."

# SSL 사용 시 추가 설정
if [ "$USE_SSL" = "true" ]; then
    echo "### SSL 모드: HTTPS 설정을 추가합니다."
    # SSL 설정 추가 로직 (필요시 구현)
else
    echo "### HTTP 모드: HTTP로만 설정됩니다."
fi
