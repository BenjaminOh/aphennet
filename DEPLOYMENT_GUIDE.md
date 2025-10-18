# 🚀 운영서버 배포 가이드

## 📋 사전 준비사항

### 1. 서버 요구사항
- **OS**: Ubuntu 20.04+ 또는 CentOS 8+
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **메모리**: 최소 4GB (권장 8GB)
- **디스크**: 최소 20GB 여유공간

### 2. 도메인 설정
- `aphennet.likeweb.co.kr` → 서버 IP
- `aphennetapi.likeweb.co.kr` → 서버 IP

## 🛠️ 배포 단계

### 1단계: 서버 준비
```bash
# Docker 설치 (Ubuntu)
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
sudo systemctl enable docker
sudo systemctl start docker

# 사용자를 docker 그룹에 추가
sudo usermod -aG docker $USER
newgrp docker
```

### 2단계: 프로젝트 업로드
```bash
# 프로젝트 클론 또는 업로드
git clone <repository-url>
cd aphennet

# 또는 SCP로 업로드
scp -r ./aphennet user@server:/home/user/
```

### 3단계: 환경변수 설정
```bash
# 운영환경 설정 파일 복사
cp .env.prod .env

# 필요시 환경변수 수정
nano .env
```

### 4단계: 운영환경 배포
```bash
# 배포 스크립트 실행
chmod +x deploy-prod.sh
./deploy-prod.sh
```

## 🔧 관리 명령어

### 컨테이너 상태 확인
```bash
docker compose -f docker-compose.prod.yml ps
```

### 로그 확인
```bash
# 전체 로그
docker compose -f docker-compose.prod.yml logs

# 특정 서비스 로그
docker compose -f docker-compose.prod.yml logs nextjs
docker compose -f docker-compose.prod.yml logs nodejs
docker compose -f docker-compose.prod.yml logs mariadb
```

### 컨테이너 재시작
```bash
# 전체 재시작
docker compose -f docker-compose.prod.yml restart

# 특정 서비스 재시작
docker compose -f docker-compose.prod.yml restart nextjs
```

## 🌐 접속 정보

- **프론트엔드**: http://aphennet.likeweb.co.kr:3000
- **API**: http://aphennetapi.likeweb.co.kr:3001
- **데이터베이스**: localhost:3306
  - 사용자: `aphennet`
  - 비밀번호: `aphennet!@34`
  - 데이터베이스: `aphennet_db`

## 🚨 문제 해결

### 1. 포트 충돌
```bash
# 포트 사용 확인
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :3001
sudo netstat -tulpn | grep :3306
```

### 2. 디스크 공간 부족
```bash
# Docker 정리
docker system prune -a --volumes

# 로그 정리
sudo journalctl --vacuum-time=7d
```

### 3. 데이터베이스 연결 문제
```bash
# MariaDB 상태 확인
docker exec aphennet-mariadb mysql -u root -p -e "SHOW DATABASES;"

# 연결 테스트
docker exec aphennet-nodejs node -e "console.log('DB connection test')"
```

## 📊 모니터링

### 헬스체크
```bash
# API 헬스체크
curl http://aphennetapi.likeweb.co.kr:3001/health
```

### 리소스 사용량
```bash
# 컨테이너 리소스 사용량
docker stats

# 디스크 사용량
df -h
```

## 🔄 업데이트 배포

### 코드 업데이트
```bash
# 1. 코드 업데이트
git pull origin main

# 2. 재배포
./deploy-prod.sh
```

### 데이터베이스 백업
```bash
# 백업 생성
docker exec aphennet-mariadb mysqldump -u root -p aphennet_db > backup_$(date +%Y%m%d_%H%M%S).sql

# 복원
docker exec -i aphennet-mariadb mysql -u root -p aphennet_db < backup_file.sql
```

## 📞 지원

문제가 발생하면 다음 정보와 함께 문의하세요:
- 서버 OS 및 버전
- Docker 버전
- 에러 로그
- 컨테이너 상태 (`docker ps -a`)
