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

# 프로젝트 의존성 설치
RUN npm install

COPY . .

RUN npm run build

# 빌드 결과 확인
RUN ls -la .next/
RUN ls -la .next/standalone/ || echo "standalone directory not found"

# standalone 디렉토리가 존재하는 경우에만 복사
RUN if [ -d ".next/standalone" ]; then \
        cp -r .next/static .next/standalone/.next/static && \
        cp -r public .next/standalone/public; \
    else \
        echo "Standalone build not found, using regular build"; \
    fi

ENV NODE_ENV=production

EXPOSE 3000

# standalone 빌드가 있으면 사용, 없으면 일반 빌드 사용
CMD if [ -f ".next/standalone/server.js" ]; then \
        echo "Using standalone build"; \
        node .next/standalone/server.js; \
    else \
        echo "Using regular build"; \
        npm start; \
    fi
