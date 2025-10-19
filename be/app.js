/*
// Project      : Basic Solution
// Copyright    : likeweb
// FileName     : app.js
// StartDate    : 2023.08.23 ash, 2025.05.12 chy
// Discription  : Basic Solution REST API
//                베이직 솔루션
*/
const http = require('http');
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const requestIp = require('request-ip');

const boardRoutes = require('./src/routes/board');
const commentRoutes = require('./src/routes/comment');
const authRoutes = require('./src/routes/auth');
const menuUserRoutes = require('./src/routes/menuUser');
const configUserRoutes = require('./src/routes/configUser');
const mainUserRoutes = require('./src/routes/mainUser');

const adminFirstRoutes = require('./src/routes/first');
const adminMenuRoutes = require('./src/routes/menu');
const adminMemberRoutes = require('./src/routes/member');
const adminBannerRoutes = require('./src/routes/banner');
const adminPopupRoutes = require('./src/routes/popup');

const adminConfigRoutes = require('./src/routes/config');
const adminStatisticsRoutes = require('./src/routes/statistics');

const adminMaintenanceRoutes = require('./src/routes/maintenance');

const errorHandler = require('./src/middleware/error');
const enumConfig = require('./src/middleware/enum');
const { logs } = require('./src/middleware/logs');
const utilMiddleware = require('./src/middleware/util');
const securityMiddleware = require('./src/middleware/security');

const PORT = process.env.PORT || 3000;

app.use(requestIp.mw());

// CORS 설정 - 모든 origin 허용 (개발용)
app.use(cors());

// 상세한 요청 로깅 미들웨어
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const clientIp = req.clientIp || req.ip || req.connection.remoteAddress;
    
    console.log('\n=== 요청 정보 ===');
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log(`클라이언트 IP: ${clientIp}`);
    console.log(`User-Agent: ${req.get('User-Agent') || 'N/A'}`);
    console.log(`Origin: ${req.get('Origin') || 'N/A'}`);
    console.log(`Referer: ${req.get('Referer') || 'N/A'}`);
    console.log(`Host: ${req.get('Host') || 'N/A'}`);
    console.log(`X-Forwarded-For: ${req.get('X-Forwarded-For') || 'N/A'}`);
    console.log(`X-Real-IP: ${req.get('X-Real-IP') || 'N/A'}`);
    
    // 요청 헤더 전체 출력
    console.log('\n=== 요청 헤더 ===');
    Object.keys(req.headers).forEach(key => {
        console.log(`${key}: ${req.headers[key]}`);
    });
    
    // 요청 본문 (POST, PUT, PATCH의 경우)
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
        console.log('\n=== 요청 본문 ===');
        console.log('Body:', JSON.stringify(req.body, null, 2));
        console.log('Content-Type:', req.get('Content-Type') || 'N/A');
    }
    
    // 쿼리 파라미터
    if (Object.keys(req.query).length > 0) {
        console.log('\n=== 쿼리 파라미터 ===');
        console.log('Query:', JSON.stringify(req.query, null, 2));
    }
    
    console.log('==================\n');
    
    next();
});

// Swagger 경로를 제외한 모든 경로에 helmet 적용
app.use((req, res, next) => {
    if (req.path.startsWith('/api-docs')) {
        // Swagger 경로는 CSP 완화
        helmet({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
                    styleSrc: ["'self'", "'unsafe-inline'", "https:"],
                    imgSrc: ["'self'", "data:", "https:"],
                    fontSrc: ["'self'", "https:", "data:"],
                },
            },
        })(req, res, next);
    } else {
        // CORS와 호환되는 helmet 설정
        helmet({
            crossOriginResourcePolicy: { policy: 'cross-origin' },
            crossOriginEmbedderPolicy: false, // CORS를 위해 비활성화
            crossOriginOpenerPolicy: false,    // CORS를 위해 비활성화
        })(req, res, next);
    }
});
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' })); // URL-encoded 데이터 허용 크기
app.use(bodyParser.json({ limit: '50mb' })); // JSON 데이터 허용 크기

app.use('/storage', express.static(path.join(process.cwd(), 'storage')));

// Rate limiting 적용
app.use(securityMiddleware.requestLimiter);

// logs
app.use(utilMiddleware.trimQuery);
app.use((req, res, next) => {
    logs(req, res, next);
    next();
});

// 보안 미들웨어 적용
app.use(securityMiddleware.security);

// Routes
app.use('/v1/board', boardRoutes);
app.use('/v1/comment', commentRoutes);
app.use('/v1/auth', authRoutes);

app.use('/v1/menu', menuUserRoutes);
app.use('/v1/config', configUserRoutes);
app.use('/v1/main', mainUserRoutes);


// Admin Routes //
app.use('/v1/admin/first', adminFirstRoutes);
app.use('/v1/admin/menu', adminMenuRoutes);

app.use('/v1/admin/member', adminMemberRoutes);
app.use('/v1/admin/banner', adminBannerRoutes);
app.use('/v1/admin/popup', adminPopupRoutes);
app.use('/v1/admin/config', adminConfigRoutes);
app.use('/v1/admin/stat', adminStatisticsRoutes);

// 유지보수 Routes
app.use('/v1/admin/maintenance', adminMaintenanceRoutes);

// 헬스 체크
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.send(
        `Welcome to LIKE WEB BASIC REST API VERSION: ${
            process.env.NODE_CONTAINER_NAME ? process.env.NODE_CONTAINER_NAME : '알 수 없는 버전'
        }`,
    );
});

// Swagger 라우터 생성 (IP 필터 포함)
const protocol = process.env.API_URL.startsWith('https') ? 'https' : 'http';
const createSwaggerRouter = (yamlFilePath, options = {}) => {
    const router = express.Router();
    const swaggerSpec = yaml.load(fs.readFileSync(path.join(__dirname, yamlFilePath), 'utf8'));
    const allowedIps = options.allowedIps || [];

    router.use((req, res, next) => {
        const clientIpRaw = req.clientIp || '';
        const clientIp = clientIpRaw.includes(':') ? clientIpRaw.split(':').pop() : clientIpRaw;
        console.log(`swagger 접속 IP: ${clientIp}`);

        next();

        // if (securityMiddleware.matchesAllowedIp(clientIp, allowedIps)) {
        //     next();
        // } else {
        //     errorHandler.errorThrow(enumConfig.statusErrorCode._403_ERROR[0], '');
        // }
    });

    const swaggerOptions = {
        swaggerOptions: {
            schemes: [protocol],
            persistAuthorization: true,
            ...options.swaggerOptions,
        },
        ...options,
    };

    router.use('/', swaggerUi.serve);
    router.get('/', (req, res, next) => {
        swaggerUi.setup(swaggerSpec, swaggerOptions)(req, res, next);
    });

    return router;
};

const allowedIpEnv = process.env.SWAGGER_IP || '';
const allowedIps = allowedIpEnv.split(',').map(ip => ip.trim());

app.use(
    '/api-docs',
    createSwaggerRouter('swagger.yaml', {
        allowedIps: allowedIps,
    }),
);

app.use(errorHandler.routesStatusCode);
app.use(errorHandler.statusCodeReturn);

app.listen(PORT, () => {
    console.log(`This server is LIKE WEB BASIC REST API server: http://localhost:${PORT}`);
});
