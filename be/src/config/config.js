const development = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: 'mariadb',
    logging: process.env.APP_ENV === 'development' ? console.log : false,
    port: process.env.DB_PORT,
    timezone: '+09:00',
    pool: {
        max: 10, // 최대 연결 수 증가
        min: 2, // 최소 연결 수 설정
        acquire: 60000, // 획득 타임아웃 증가
        idle: 30000, // 유휴 타임아웃 증가
        evict: 1000, // 연결 정리 간격
        handleDisconnects: true // 연결 끊김 자동 처리
    },
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        allowPublicKeyRetrieval: true, // MySQL 8.0 공개키 검색 허용
        ssl: false,
        connectTimeout: 60000, // 연결 타임아웃 60초
        acquireTimeout: 60000, // 획득 타임아웃 60초
        timeout: 60000, // 일반 타임아웃 60초
        // MariaDB 최적화 설정
        supportBigNumbers: true,
        bigNumberStrings: true,
        dateStrings: true, // 날짜 문자열 형식 허용
        typeCast: true // 데이터 형식 자동 변환 허용
    },
};
const maintenance = {
    username: process.env.LW_USER,
    password: process.env.LW_PASS,
    host: process.env.LW_HOST,
    database: process.env.LW_NAME,
    dialect: 'mssql',
    port: process.env.LW_PORT,
    timezone: '+09:00',
    dialectOptions: {
        dateStrings: true, // 날짜 문자열 형식 허용
        typeCast: true, // 데이터 형식 자동 변환 허용
    },
};

const jwToken = {
    secretkey: process.env.SECRETKEY,
    refreshSecretkey: process.env.REFRESHSECRETKEY,
    option: {
        algorithm: process.env.ALG,
        expiresIn: process.env.EXP,
        refreshExpiresIn: process.env.REFRESHEXP,
        issuer: process.env.ISS,
    },
};

// 운영환경 설정 (development와 동일하지만 로깅 비활성화)
const production = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    dialect: 'mariadb',
    logging: false, // 운영환경에서는 로깅 비활성화
    port: process.env.DB_PORT,
    timezone: '+09:00',
    pool: {
        max: 20, // 운영환경에서는 더 많은 연결 허용
        min: 5,
        acquire: 60000,
        idle: 30000,
        evict: 1000,
        handleDisconnects: true
    },
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        allowPublicKeyRetrieval: true,
        ssl: false,
        connectTimeout: 60000,
        acquireTimeout: 60000,
        timeout: 60000,
        supportBigNumbers: true,
        bigNumberStrings: true,
        dateStrings: true,
        typeCast: true
    }
};

module.exports = { development, production, maintenance, jwToken };
