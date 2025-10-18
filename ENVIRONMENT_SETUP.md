# 환경별 Docker Compose 설정

## 📁 파일 구조

```
├── docker-compose.base.yml      # 공통 서비스 정의
├── docker-compose.dev.yml       # 개발환경 설정
├── docker-compose.prod.yml      # 운영환경 설정
├── .env.dev                     # 개발환경 환경변수
├── .env.prod                    # 운영환경 환경변수
├── start-dev.sh                 # 개발환경 시작 스크립트
└── start-prod.sh                # 운영환경 시작 스크립트
```

## 🚀 사용 방법

### 개발환경 시작
```bash
./start-dev.sh
```
- **접속 URL**: http://aphennet.likeweb.co.kr:3000
- **API URL**: http://aphennetapi.likeweb.co.kr:3001
- **특징**: HTTP만 사용, Hot Reload 활성화

### 운영환경 시작
```bash
./start-prod.sh
```
- **접속 URL**: http://aphennet.likeweb.co.kr:3000
- **API URL**: http://aphennetapi.likeweb.co.kr:3001
- **특징**: HTTP 사용, 직접 포트 노출

## 🔧 환경별 차이점

| 구분 | 개발환경 | 운영환경 |
|------|----------|----------|
| **프로토콜** | HTTP | HTTP |
| **API URL** | http://aphennetapi.likeweb.co.kr:3001 | http://aphennetapi.likeweb.co.kr:3001 |
| **Hot Reload** | ✅ 활성화 | ❌ 비활성화 |
| **볼륨 마운트** | ✅ 소스코드 실시간 동기화 | ❌ 빌드된 이미지 사용 |
| **포트 노출** | 직접 포트 노출 | 직접 포트 노출 |

## 📋 수동 실행

### 개발환경
```bash
cp .env.dev .env
docker-compose -f docker-compose.base.yml -f docker-compose.dev.yml up -d
```

### 운영환경
```bash
cp .env.prod .env
docker-compose -f docker-compose.base.yml -f docker-compose.prod.yml up -d
```

## 🔄 환경 전환

### 개발 → 운영
```bash
docker-compose down
./start-prod.sh
```

### 운영 → 개발
```bash
docker-compose down
./start-dev.sh
```
