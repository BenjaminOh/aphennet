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
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        allowPublicKeyRetrieval: true, // MySQL 8.0 공개키 검색 허용
        ssl: false,
        connectTimeout: 60000, // 연결 타임아웃 60초
        acquireTimeout: 60000, // 획득 타임아웃 60초
        timeout: 60000 // 일반 타임아웃 60초
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

module.exports = { development, maintenance, jwToken };
