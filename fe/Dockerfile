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

RUN npm run build || (echo "Build failed, checking for errors..." && exit 1)

# 빌드 결과 확인
RUN ls -la .next/
RUN ls -la .next/static/ || echo "static directory not found"
RUN cat .next/BUILD_ID || echo "BUILD_ID not found"

ENV NODE_ENV=production

EXPOSE 3000

# Next.js 프로덕션 서버 시작
CMD ["npm", "start"]
