const moment = require('moment');
const axios = require('axios');
const { i_config } = require('../models');
const fs = require('fs');
const path = require('path');
const errorHandler = require('../middleware/error');
const enumConfig = require('../middleware/enum');

//게시글 내용 base64 이미지 변경
//
// 주의: 이 함수는 요청 본문 전체(수십 MB가 될 수 있는 문자열)를 다룬다.
// 예전 구현은 이미지마다 `temp_contents.replace(...)` 로 본문 전체를 새로 복사해
// 12장이면 37MB 문자열을 12번 만들었고, heap 을 넘겨 프로세스가 죽었다.
// (2026-08-25 운영 장애: FATAL ERROR: Reached heap limit)
// 지금은 regex.exec 로 위치만 잡아 조각을 모으고 마지막에 한 번만 join 한다.
exports.base64ToImagesPath = async b_contents => {
    // 본문에 실려 오는 base64 이미지 상한.
    // fe/src/components/editor/utils/image-insert-options.ts 의
    // MAX_IMAGE_BYTES / MAX_TOTAL_IMAGE_BYTES / MAX_IMAGE_COUNT 와 반드시 같은 값을 유지할 것.
    // (한쪽만 바뀌면 프런트는 통과시키고 저장 시점에야 에러가 난다)
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB
    const MAX_IMAGES = 12; // 최대 12장

    const toMb = bytes => Math.round((bytes / 1024 / 1024) * 10) / 10;

    const re = /data:image\/(\w+);base64,([^"]+)/g;
    const parts = [];
    const imagePaths = [];
    let lastIndex = 0;
    let index = 0;
    let totalSize = 0;
    let match;

    while ((match = re.exec(b_contents)) !== null) {
        if (index >= MAX_IMAGES) {
            errorHandler.errorThrow(413, `이미지는 최대 ${MAX_IMAGES}장까지 넣을 수 있습니다.`);
        }

        const ext = match[1].toLowerCase() === 'jpeg' ? 'jpg' : match[1].toLowerCase();
        const base64 = match[2];

        // 크기 체크 (base64는 원본보다 33% 더 큼)
        const decodedSize = (base64.length * 3) / 4;
        if (decodedSize > MAX_IMAGE_SIZE) {
            errorHandler.errorThrow(
                413,
                `이미지 크기가 너무 큽니다: ${toMb(decodedSize)}MB (최대 ${toMb(MAX_IMAGE_SIZE)}MB)`,
            );
        }

        totalSize += decodedSize;
        if (totalSize > MAX_TOTAL_SIZE) {
            errorHandler.errorThrow(
                413,
                `전체 이미지 크기가 너무 큽니다: ${toMb(totalSize)}MB (최대 ${toMb(MAX_TOTAL_SIZE)}MB)`,
            );
        }

        // 이미지 파일 경로 및 이름 생성
        const imageName = Date.now() + '_' + index + '.' + ext;
        const imagePath = 'storage/board/' + imageName;
        imagePaths.push(imagePath);

        try {
            await fs.promises.writeFile(imagePath, Buffer.from(base64, 'base64'));
        } catch (err) {
            console.error('Failed to save the image: ' + err);
            errorHandler.errorThrow(500, '이미지 저장에 실패했습니다.');
        }

        // 본문 전체를 복사하지 않고, base64 앞부분 조각 + 저장된 URL 만 쌓는다.
        parts.push(b_contents.slice(lastIndex, match.index), process.env.API_URL + '/' + imagePath);
        lastIndex = match.index + match[0].length;
        index += 1;
    }

    // 이미지가 하나도 없으면 원본을 그대로 돌려준다 (불필요한 복사 방지)
    if (index === 0) {
        return { temp_contents: b_contents, imagePaths };
    }

    parts.push(b_contents.slice(lastIndex));

    return { temp_contents: parts.join(''), imagePaths };
};

//이메일 전송
exports.postEmailSendGun = async (res, to_email, from_email, subject, contents) => {
    try {
        if (!to_email) {
            const configView = await i_config.findOne({
                attributes: ['c_email'],
                where: {
                    site_id: process.env.ISS,
                },
            });
            to_email = configView.c_email;
            from_email = configView.c_email;

            if (!configView) {
                return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
            }
        }

        const data = {
            from: from_email,
            to: to_email,
            subject: subject,
            html: contents,
        };

        const sendResult = await exports.sendMail(data.from, data.to, data.subject, data.html);

        console.log('이메일 전송 완료:', data);
        return sendResult;
    } catch (error) {
        console.log('이메일 전송 오류:', error);
        throw error;
    }
};

// 메일전송 함수
exports.sendMail = async (fromEmail, toEmail, subject, content, file = null) => {
    try {
        const tokenOptions = {
            method: 'POST',
            url: 'http://api.likeweb.co.kr/v1/mailGun/token',
            data: {
                user_id: process.env.MAILID,
                user_pw: process.env.MAILPW,
            },
        };

        // 메일 토큰 발급
        let mailToken;
        try {
            mailToken = await axios(tokenOptions);
        } catch (err) {
            console.log(err.message);
            return errorHandler.errorThrow(
                enumConfig.statusErrorCode._500_ERROR[0],
                '메일 토큰을 가져오는 데 실패했습니다.',
            );
        }

        // 메일 전송 옵션 설정
        const mailOptions = {
            method: 'POST',
            url: 'http://api.likeweb.co.kr/v1/mailGun/send',
            data: {
                from_email: fromEmail,
                to_email: toEmail,
                subject: subject,
                content: content,
                attachFile: file ? `${process.env.API_URL}/${file[0].path}` : '',
            },
            headers: {
                Authorization: `Bearer ${mailToken.data.data.accessToken}`,
            },
        };

        try {
            await axios(mailOptions);
        } catch (err) {
            console.log(err.message);
            return errorHandler.errorThrow(enumConfig.statusErrorCode._500_ERROR[0], '메일 전송에 실패했습니다.');
        }
    } catch (error) {
        console.log('이메일 전송 함수 에러:', error);
        return errorHandler.errorThrow(enumConfig.statusErrorCode._500_ERROR[0], `이메일 전송 함수 에러`);
    }
};

/*
// Name         : paginationCalc
// writer        : chy
// Discription  : 페이지네이션 계산 함수
*/
exports.paginationCalc = (totalCount, currentPage, itemsPerPage = 10, maxPageNumbers = 10) => {
    const lastPage = Math.ceil(totalCount / itemsPerPage);
    const startPage = Math.max(1, Math.floor((currentPage - 1) / maxPageNumbers) * maxPageNumbers + 1);
    const endPage = Math.min(lastPage, startPage + maxPageNumbers - 1);

    return {
        limit: itemsPerPage,
        current_page: currentPage,
        start_page: startPage,
        max_page: maxPageNumbers,
        last_page: lastPage,
        end_page: endPage,
        total_count: totalCount,
    };
};

/*
// Name         : mapContentType
// writer        : chy
// Discription  : 컨텐츠 타입
*/
exports.mapContentType = contentType => {
    switch (contentType) {
        case enumConfig.contentType.HTML[0]:
            return enumConfig.contentType.HTML;
        case enumConfig.contentType.EMPTY[0]:
            return enumConfig.contentType.EMPTY;
        case enumConfig.contentType.CUSTOM[0]:
            return enumConfig.contentType.CUSTOM;
        case enumConfig.contentType.BOARD[0]:
            return enumConfig.contentType.BOARD;
        case enumConfig.contentType.GALLERY[0]:
            return enumConfig.contentType.GALLERY;
        case enumConfig.contentType.FAQ[0]:
            return enumConfig.contentType.FAQ;
        case enumConfig.contentType.QNA[0]:
            return enumConfig.contentType.QNA;
        default:
            return null;
    }
};

/*
// Name         : trimQuery
// writer        : chy
// Discription  : 요청 바디, 쿼리의 공백 제거
*/
exports.trimQuery = (req, res, next) => {
    if (req.body) {
        req.body = Object.keys(req.body).reduce((accumulator, key) => {
            accumulator[key] = typeof req.body[key] === 'string' ? req.body[key].trim() : req.body[key];
            return accumulator;
        }, {});
    }

    Object.keys(req.query).forEach(key => {
        req.query[key] = typeof req.query[key] === 'string' ? req.query[key].trim() : req.query[key];
    });
    next();
};

/*
// Name         : codeCheckUTC
// writer        : chy
// Discription  : 시간차 계산 UTC
*/
exports.codeCheckUTC = async date => {
    const codeDate = moment.utc(date);
    const utcOffset = codeDate.utcOffset();
    const now = moment();
    const localOffset = now.utcOffset();
    const offsetDifference = utcOffset - localOffset;
    const minutesDifference = now.diff(codeDate, 'minutes') - offsetDifference;

    return minutesDifference;
};

/*
// Name         : codeCheckLocal
// writer        : chy
// Discription  : 시간차 계산 로컬
*/
exports.codeCheckLocal = async date => {
    const codeDate = moment(date);
    const now = moment();
    const minutesDifference = now.diff(codeDate, 'minutes');

    return minutesDifference;
};

/*
// Name         : formatPhone
// writer        : chy
// Discription  : 핸드폰 번호 하이픈 제거
*/
exports.formatPhone = phoneNumber => {
    return phoneNumber.replace(/-/g, '');
};

/*
// Name         : extractAddress
// writer        : chy
// Discription  : 주소 (읍, 면, 리, 구, 동) 리턴
*/
exports.extractAddress = async str => {
    // 구, 군, 읍, 면, 리, 동을 포함하는 부분을 추출
    let match = str.match(/(\S+(?:구|군|읍|면|리|동)(?:\s+\S+(?:구|군|읍|면|리|동))*)/);

    if (match) {
        return match[0].replace(/\d+/g, '');
    }

    return null;
};

/*
// Name         : validateAmount
// writer        : chy
// Discription  : 파라미터 1000억까지
*/
exports.validateAmount = amount => {
    const MAX_AMOUNT = 100000000000; // 1000억원

    if (amount > MAX_AMOUNT) {
        return errorHandler.errorThrow(
            enumConfig.statusErrorCode._400_ERROR[0],
            `100,000,000,000을 초과할 수 없습니다.`,
        );
    }
};

/*
// Name         : validateIdx
// writer        : chy
// Discription  : 파라미터 유효성 검사
*/
exports.validateIdx = (idx, name) => {
    const parsedIdx = parseInt(idx);

    const throwError = () => {
        return errorHandler.errorThrow(enumConfig.statusErrorCode._400_ERROR[0], `유효하지 않은 ${name} 값입니다.`);
    };

    if ((!idx && idx !== 0) || isNaN(parsedIdx)) {
        return throwError();
    }

    return parsedIdx;
};

/*
// Name         : validateArray
// writer        : chy
// Discription  : 배열 파라미터 유효성 검사
*/
exports.validateArray = (fieldName, name) => {
    if (!fieldName || !Array.isArray(fieldName)) {
        return errorHandler.errorThrow(enumConfig.statusErrorCode._400_ERROR[0], `유효한 ${name} 배열이 필요합니다.`);
    }
    if (fieldName.length === 0) {
        return errorHandler.errorThrow(enumConfig.statusErrorCode._400_ERROR[0], `선택된 항목이 없습니다.`);
    }
};

/*
// Name         : validateNotEmpty
// writer        : chy
// Discription  : 필드 체크
*/
exports.validateNotEmpty = (value, fieldName) => {
    if (!value || value.trim() === '') {
        return errorHandler.errorThrow(enumConfig.statusErrorCode._400_ERROR[0], `${fieldName}을(를) 입력하세요.`);
    }
};

/*
// Name         : validateAndFormatDate
// writer        : chy
// Discription  : date 유효성 검사
*/
exports.validateAndFormatDate = (date, options) => {
    const { format, fieldName, useDefault } = options;

    if (date === '') {
        return errorHandler.errorThrow(
            enumConfig.statusErrorCode._400_ERROR[0],
            `유효하지 않은 ${fieldName} 값입니다. 올바른 형식은 ${format}입니다.`,
        );
    }

    if (date) {
        const dateMoment = moment(date, format, true);
        if (!dateMoment.isValid()) {
            return errorHandler.errorThrow(
                enumConfig.statusErrorCode._400_ERROR[0],
                `유효하지 않은 ${fieldName} 값입니다. 올바른 형식은 ${format}입니다.`,
            );
        }
        return dateMoment.format(format);
    }

    // useDefault true일 경우 오늘날짜 리턴
    if (useDefault) {
        return moment().format(format);
    }

    return errorHandler.errorThrow(enumConfig.statusErrorCode._400_ERROR[0], `${fieldName}는 필수 값입니다.`);
};

/*
// Name         : addDateCondition
// writer        : chy
// Discription  : 기간 검색
*/
exports.addDateCondition = (condition, startDate, startTime, endDate, endTime, type) => {
    if (startDate || endDate) {
        condition[type] = {};

        if (startDate) {
            // startDate 검증 및 포맷팅
            const validatedStartDate = exports.validateAndFormatDate(startDate, {
                format: 'YYYY-MM-DD',
                fieldName: '시작 날짜',
            });

            // startTime 검증 및 포맷팅
            const validatedStartTime = startTime
                ? exports.validateAndFormatDate(startTime, {
                      format: 'HH:mm:ss',
                      fieldName: '시작 시간',
                  })
                : '00:00:00'; // 기본값

            // 시작 날짜와 시간 결합
            const startDateTime = moment(`${validatedStartDate} ${validatedStartTime}`, 'YYYY-MM-DD HH:mm:ss').format(
                'YYYY-MM-DD HH:mm:ss.SSS',
            );

            condition[type][Op.gte] = startDateTime;
        }

        if (endDate) {
            // endDate 검증 및 포맷팅
            const validatedEndDate = exports.validateAndFormatDate(endDate, {
                format: 'YYYY-MM-DD',
                fieldName: '종료 날짜',
            });

            // endTime 검증 및 포맷팅
            const validatedEndTime = endTime
                ? exports.validateAndFormatDate(endTime, {
                      format: 'HH:mm:ss',
                      fieldName: '종료 시간',
                  })
                : '23:59:59'; // 기본값

            // 종료 날짜와 시간 결합
            const endDateTime = moment(`${validatedEndDate} ${validatedEndTime}`, 'YYYY-MM-DD HH:mm:ss').format(
                'YYYY-MM-DD HH:mm:ss.SSS',
            );

            condition[type][Op.lte] = endDateTime;
        }
    }
};
