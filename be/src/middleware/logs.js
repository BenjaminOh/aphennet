const parseurl = require('parseurl');
const { Op } = require('sequelize');
const { i_logs } = require('../models');
const { accessVerify } = require('../middleware/jwt');

// bodyLog 컬럼은 TEXT(65535 bytes). 한글은 UTF-8 3바이트라 여유를 두고 자른다.
const BODY_LOG_MAX_BYTES = 60000;

// 게시글 본문(b_contents)은 base64 이미지를 품어 수십 MB가 되기도 한다.
// 60KB로 자르겠다고 전체를 JSON.stringify 하면 그 자체로 heap을 밀어올린다.
// 그래서 stringify 전에 긴 문자열 필드를 먼저 잘라낸다.
const FIELD_PREVIEW_CHARS = 2000;

const previewBody = body => {
    if (!body || typeof body !== 'object') return null;

    const preview = {};
    for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string' && value.length > FIELD_PREVIEW_CHARS) {
            preview[key] = value.slice(0, FIELD_PREVIEW_CHARS) + `…(${value.length}자 중 일부)`;
        } else {
            preview[key] = value;
        }
    }
    return preview;
};

const sanitizeBodyLog = value => {
    if (!value) return null;

    // 4바이트 UTF-8 문자(이모지 등) 제거 — utf8mb3 컬럼 호환성 확보
    let body = value.replace(/[\u{10000}-\u{10FFFF}]/gu, '');

    // 컬럼 한도를 넘으면 잘라낸다 (Data too long 방지)
    if (Buffer.byteLength(body, 'utf8') > BODY_LOG_MAX_BYTES) {
        body = Buffer.from(body, 'utf8').subarray(0, BODY_LOG_MAX_BYTES).toString('utf8') + '…(truncated)';
    }

    return body;
};

exports.logs = async (req, res, next) => {
    const authHeader = req.get('Authorization') || ' ';

    let decodedTokenUser = null;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        let decodedToken = null;
        decodedToken = accessVerify(token);
        if (decodedToken.decoded !== null) {
            decodedTokenUser = decodedToken.decoded.user;
        }
    }

    //const previousUrl = req.headers.referer;
    const previousUrl = parseurl(req).path;
    const clientIp = req.clientIp;
    const userAgent = req.get('user-agent');

    //const normalizedClientIp = clientIp.substring(clientIp.lastIndexOf(':') + 1);
    const normalizedClientIp = clientIp.includes(':') ? clientIp.split(':').pop() : clientIp;

    if (req.path.startsWith('/api-docs')) return;

    // 응답이 끝난 뒤에 기록한다.
    // 이 시점에는 라우트의 multer/bodyParser가 req.body를 이미 채워놓았으므로
    // 로깅을 위해 요청 스트림을 다시 읽을 필요가 없다.
    // (예전에는 multipart 요청을 두 번째 multer로 다시 파싱했는데, 라우트의
    //  multer와 같은 스트림을 두고 경합해 첨부파일이 유실되거나 요청이 멈췄다.)
    res.on('finish', async () => {
        try {
            const bodyPreview = previewBody(req.body);
            const bodyLog =
                bodyPreview && Object.keys(bodyPreview).length > 0 ? JSON.stringify(bodyPreview) : null;

            await i_logs.create({
                user: decodedTokenUser,
                clientIp: normalizedClientIp,
                userAgent: userAgent,
                previousUrl: previousUrl,
                bodyLog: sanitizeBodyLog(bodyLog),
            });
        } catch (err) {
            // 로그 저장 실패가 서비스에 영향을 주면 안 된다.
            // 응답은 이미 전송된 뒤이므로 next(err)를 호출하지 않는다.
            console.error('로그 저장 실패:', err.message);
        }
    });
};
