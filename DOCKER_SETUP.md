# Docker 환경 설정 가이드

이 프로젝트는 nginx, MariaDB, Next.js, Node.js를 포함한 완전한 Docker 환경을 제공합니다.

## 🚀 빠른 시작

### 1. 환경 변수 파일 생성

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# 애플리케이션 환경 설정
APP_ENV=development
NODE_ENV=development

# 포트 설정
REACT_EXPOSE_PORT=3000
REACT_CONTAINER_PORT=3000
NODE_EXPOSE_PORT=3001
NODE_CONTAINER_PORT=3000
NGINX_EXPOSE_PORT=80
DB_EXPOSE_PORT=3306

# API URL 설정
API_URL=http://localhost:3001

# Next.js 환경 변수
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SITE_ID=aphennet
NEXT_PUBLIC_MAINT_NAME=Aphennet
NEXT_PUBLIC_ENCRYPTION_KEY=aphennet_encryption_key_2024

# 데이터베이스 설정 (MariaDB)
DB_ROOT_PASSWORD=root_password_2024
DB_HOST=mariadb
DB_PORT=3306
DB_NAME=aphennet_db
DB_USER=aphennet_user
DB_PASS=aphennet_password_2024

# JWT 설정
SECRETKEY=aphennet_jwt_secret_key_2024
REFRESHSECRETKEY=aphennet_refresh_secret_key_2024
ALG=HS256
EXP=1h
REFRESHEXP=7d
ISS=aphennet

# 유지보수용 데이터베이스 설정 (MSSQL - 선택사항)
LW_HOST=your_mssql_host
LW_PORT=1433
LW_NAME=your_mssql_db
LW_USER=your_mssql_user
LW_PASS=your_mssql_password

# Swagger 설정
SWAGGER_IP=127.0.0.1,::1
```

### 2. Docker 컨테이너 실행

```bash
# 모든 서비스 빌드 및 실행
docker-compose up --build

# 백그라운드에서 실행
docker-compose up -d --build

# 특정 서비스만 실행
docker-compose up nginx mariadb react-app node-app
```

### 3. SSL 인증서 설정 (선택사항)

```bash
# SSL 인증서 초기화 (실제 도메인으로 변경 필요)
./certbot/init-letsencrypt.sh

# 또는 테스트 환경에서 실행
# certbot/init-letsencrypt.sh 파일에서 staging=1로 변경 후 실행
```

### 4. 서비스 접속

- **웹 애플리케이션**: 
  - HTTP: http://localhost (nginx를 통한 접속)
  - HTTPS: https://localhost (SSL 인증서 설정 후)
- **Next.js 개발 서버**: http://localhost:3000 (직접 접속)
- **Node.js API**: http://localhost:3001 (직접 접속)
- **MariaDB**: localhost:3306
- **API 문서 (Swagger)**: http://localhost:3001/api-docs

## 🏗️ 아키텍처

```
┌─────────────────┐
│      nginx      │ ← 포트 80 (리버스 프록시)
│   (포트 80)     │
└─────────┬───────┘
          │
    ┌─────┴─────┐
    │           │
┌───▼───┐   ┌───▼───┐
│ Next.js│   │Node.js│
│(포트 3000)│ │(포트 3000)│
└───────┘   └───┬───┘
                │
        ┌───────▼───────┐
        │   MariaDB     │
        │  (포트 3306)  │
        └───────────────┘
```

## 📁 디렉토리 구조

```
aphennet/
├── nginx/
│   └── nginx.conf          # nginx 설정
├── mariadb/
│   └── init.sql            # MariaDB 초기화 스크립트
├── fe/                     # Next.js 프론트엔드
├── be/                     # Node.js 백엔드
├── docker-compose.yml      # Docker Compose 설정
├── .env                    # 환경 변수 (생성 필요)
└── env.example            # 환경 변수 예시
```

## 🔧 주요 기능

### nginx 설정
- 리버스 프록시로 Next.js와 Node.js 연결
- 정적 파일 캐싱
- Gzip 압축
- 파일 업로드 지원 (최대 50MB)
- SSL/HTTPS 지원 (certbot과 연동)
- HTTP에서 HTTPS로 자동 리다이렉트

### SSL/HTTPS 설정
- Let's Encrypt 인증서 자동 발급 및 갱신
- TLS 1.2/1.3 지원
- 보안 헤더 설정 (HSTS, X-Frame-Options 등)
- ACME 챌린지 지원

### MariaDB 설정
- UTF8MB4 문자셋 지원
- 자동 초기화 스크립트 실행
- 데이터 영속성을 위한 볼륨 마운트

### Next.js 설정
- 개발/프로덕션 환경 분리
- 환경 변수 주입
- Hot reload 지원 (개발 모드)

### Node.js 설정
- 헬스체크 엔드포인트
- 데이터베이스 연결
- 파일 업로드 디렉토리 마운트

## 🛠️ 개발 명령어

```bash
# 로그 확인
docker-compose logs -f [서비스명]

# 특정 서비스 재시작
docker-compose restart [서비스명]

# 컨테이너 내부 접속
docker-compose exec [서비스명] sh

# 데이터베이스 접속
docker-compose exec mariadb mysql -u aphennet_user -p aphennet_db

# 볼륨 정리
docker-compose down -v

# 이미지 재빌드
docker-compose build --no-cache

# SSL 인증서 관련 명령어
# 인증서 수동 갱신
docker-compose run --rm certbot renew

# 인증서 상태 확인
docker-compose exec certbot certbot certificates

# 테스트 인증서 발급 (staging)
docker-compose run --rm certbot certonly --webroot --webroot-path=/var/www/certbot --staging -d yourdomain.com
```

## 🔍 문제 해결

### 포트 충돌
다른 서비스가 같은 포트를 사용하는 경우 `.env` 파일에서 포트를 변경하세요.

### 데이터베이스 연결 오류
MariaDB 컨테이너가 완전히 시작될 때까지 기다린 후 애플리케이션을 시작하세요.

### 권한 문제
파일 업로드 디렉토리에 적절한 권한이 있는지 확인하세요.

## 📝 추가 설정

### 프로덕션 환경
프로덕션 환경에서는 다음을 고려하세요:
- SSL 인증서 설정
- 환경 변수 보안 강화
- 로그 로테이션 설정
- 모니터링 도구 추가

### 데이터베이스 백업
```bash
# 데이터베이스 백업
docker-compose exec mariadb mysqldump -u root -p aphennet_db > backup.sql

# 데이터베이스 복원
docker-compose exec -T mariadb mysql -u root -p aphennet_db < backup.sql
```
