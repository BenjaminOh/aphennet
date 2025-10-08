# 개발 환경
FROM node:20 as development

WORKDIR /app

# 환경 변수
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_ID
ARG NEXT_PUBLIC_MAINT_NAME
ARG NEXT_PUBLIC_ENCRYPTION_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_ID=$NEXT_PUBLIC_SITE_ID
ENV NEXT_PUBLIC_MAINT_NAME=$NEXT_PUBLIC_MAINT_NAME
ENV NEXT_PUBLIC_ENCRYPTION_KEY=$NEXT_PUBLIC_ENCRYPTION_KEY

COPY package*.json ./

# 프로젝트 의존성 설치
RUN npm install

COPY . .

# 개발 환경용 포트
EXPOSE 3000

CMD ["npm", "run", "dev"]

# 프로덕션 환경
FROM node:20 as production

WORKDIR /app

# 환경 변수
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_ID
ARG NEXT_PUBLIC_MAINT_NAME
ARG NEXT_PUBLIC_ENCRYPTION_KEY

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_SITE_ID=$NEXT_PUBLIC_SITE_ID
ENV NEXT_PUBLIC_MAINT_NAME=$NEXT_PUBLIC_MAINT_NAME
ENV NEXT_PUBLIC_ENCRYPTION_KEY=$NEXT_PUBLIC_ENCRYPTION_KEY

COPY package*.json ./

# 모든 의존성 설치 (standalone 빌드에 필요)
RUN npm install

COPY . .

# Next.js 빌드
RUN npm run build

# 빌드 결과 확인
RUN ls -la .next/
RUN ls -la .next/standalone/ || echo "standalone directory not found"
RUN ls -la .next/standalone/server.js || echo "standalone server.js not found"

# standalone 모드에서 필요한 파일들 복사
RUN if [ -d ".next/standalone" ]; then \
        echo "Standalone build successful"; \
        cp -r .next/standalone/* .; \
    else \
        echo "Standalone build failed, using regular build"; \
    fi

ENV NODE_ENV=production

EXPOSE 3000

# Next.js 프로덕션 서버 시작 (standalone 모드)
CMD ["node", "server.js"]
