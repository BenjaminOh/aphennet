const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { ib_admin, i_comment } = require('../models');

const multerMiddleware = require('../middleware/multer');
const utilMiddleware = require('../middleware/util');
const errorHandler = require('../middleware/error');
const enumConfig = require('../middleware/enum');
const path = require('path');

// 관리자 유지보수 게시판 리스트
exports.getMaintenanceBoardList = async (req, res, next) => {
    const { category } = req.params;
    const page = parseInt(req.query.page) || 1;
    const process = req.query.process;
    const getLimit = req.query.getLimit || 10;

    try {
        const searchQuery = req.query.search;
        const searchTxtQuery = req.query.searchtxt ? req.query.searchtxt.trim() : '';
        const whereCondition = {
            category_id: category,
        };

        if (process) {
            whereCondition.process = process;
        }

        if (searchQuery && searchTxtQuery) {
            if (searchQuery === 'title') {
                whereCondition.subject = {
                    [Op.like]: `%${searchTxtQuery}%`,
                };
            }

            if (searchQuery === 'contents') {
                whereCondition.contents = {
                    [Op.like]: `%${searchTxtQuery}%`,
                };
            }

            if (searchQuery === 'titlecontents') {
                whereCondition[Op.or] = [
                    {
                        subject: {
                            [Op.like]: `%${searchTxtQuery}%`,
                        },
                    },
                    {
                        contents: {
                            [Op.like]: `%${searchTxtQuery}%`,
                        },
                    },
                ];
            }
        }

        const orderField = [
            ['notice', 'DESC'],
            ['reply', 'DESC'],
            ['reply_step', 'ASC'],
        ];
        const subQuery = `(SELECT COUNT(*) FROM i_comment WHERE i_comment.c_table = 'admin' and i_comment.list_no = ib_admin.list_no)`;

        const limit = parseInt(getLimit);

        const offset = (page - 1) * limit;

        const result = await ib_admin.findAndCountAll({
            offset: offset,
            limit: limit,
            where: whereCondition,
            order: orderField,
            attributes: [
                'list_no',
                'category_id',
                'subject',
                'name',
                'process',
                'w_date',
                [Sequelize.literal(subQuery), 'comment_count'],
            ],
        });

        const formattedResult = result.rows.map((list, index) => ({
            list_no: list.list_no,
            category_id: list.category_id,
            num: result.count - (offset + index),
            subject: list.subject,
            name: list.name,
            w_date: moment.utc(list.w_date).format('YYYY.MM.DD HH:mm'),
            process: list.process,
            comment_count: list.getDataValue('comment_count'),
        }));

        const count = result.count;
        const pagination = utilMiddleware.paginationCalc(count, page, limit);

        const resultObj = {
            ...pagination,
            data_list: formattedResult,
        };

        return errorHandler.successThrow(res, '', resultObj);
    } catch (err) {
        next(err);
    }
};

// 유지보수 게시판 조회
exports.getMaintenanceBoardView = async (req, res, next) => {
    const { category, list_no } = req.params;

    try {
        utilMiddleware.validateIdx(list_no, 'list_no');

        const result = await ib_admin.findOne({
            where: { category_id: category, list_no: list_no },
            attributes: [
                'list_no',
                'category_id',
                'email',
                'company',
                'subject',
                'name',
                'w_date',
                'contents',
                'b_file',
                'm_tel',
                'm_email',
                'counter',
                'process',
            ],
        });

        if (!result) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '해당 게시물이 없습니다.');
        }

        const resultObj = {
            list_no: result.list_no,
            category_id: result.category_id,
            email: result.email,
            company: result.company,
            subject: result.subject,
            name: result.name,
            w_date: moment.utc(result.w_date).format('YYYY.MM.DD HH:mm'),
            counter: result.counter,
            contents: result.contents,
            b_file: result.b_file,
            m_tel: result.m_tel,
            m_email: result.m_email,
            process: result.process,
        };

        return errorHandler.successThrow(res, '', resultObj);
    } catch (err) {
        next(err);
    }
};

// 유지보수 게시판 등록
exports.getMaintenanceBoardCreate = async (req, res, next) => {
    const {
        category,
        name,
        password,
        subject,
        company,
        email,
        m_tel = null,
        m_email = null,
        contents,
        b_file,
    } = req.body;

    try {
        const uploadedFile = req.files['b_file'];

        // 파일이 업로드된 경우에만 처리
        if (uploadedFile) {
            // FormData 생성
            const formData = new FormData();
            const filePath = path.join(__dirname, '../../', uploadedFile[0].path);
            // 파일 추가
            formData.append('file', fs.createReadStream(filePath)); // 업로드된 파일 추가

            formData.append('category', category);
            formData.append('originalname', uploadedFile[0].filename);

            // 다른 서버의 업로드 엔드포인트 URL 설정
            const uploadServerUrl = 'https://adn.likeweb.co.kr/api_attachfile.asp'; // 대상 서버 URL

            // Axios를 사용하여 파일 및 데이터를 다른 서버로 전송
            const response = await axios.post(uploadServerUrl, formData, {
                headers: {
                    ...formData.getHeaders(), // 필수: FormData 헤더 추가
                },
            });

            // 업로드 완료 후 업로드된 파일 삭제 (옵션) 주석처리 TEST
            await multerMiddleware.clearFile(uploadedFile[0].path);

            // 다른 서버에서의 응답 처리
            console.log('다른 서버 응답:', response.data);
        }

        const processedContents = await utilMiddleware.base64ToImagesPath(contents);

        const maxReply = await ib_admin.max('reply');

        const normalizedFilename = uploadedFile ? category + '_' + uploadedFile[0].filename : '';
        const boardCreate = await ib_admin.create({
            category_id: category,
            m_id: '',
            password: password,
            email: email,
            company: company,
            name: name,
            subject: subject,
            contents: processedContents.temp_contents,
            notice: '0',
            reply: maxReply + 1,
            reply_level: '0',
            reply_step: '0',
            b_file: normalizedFilename,
            counter: '0',
            recommend: '0',
            bad: '0',
            m_tel: m_tel,
            m_email: m_email,
        });

        if (!boardCreate) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        return errorHandler.successThrow(res, '', boardCreate);
    } catch (err) {
        next(err);
    }
};

// 유지보수 게시판 댓글 등록
exports.postMaintenanceCommentCreate = async (req, res, next) => {
    const { list_no, c_name, c_content, m_id, c_password, c_table } = req.body;

    try {
        utilMiddleware.validateIdx(list_no, 'list_no');

        const commentCreate = await i_comment.create({
            list_no: list_no,
            c_name: c_name,
            c_content: c_content,
            m_id: m_id,
            c_password: c_password,
            c_table: c_table,
        });

        if (!commentCreate) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        return errorHandler.successThrow(res, '', commentCreate);
    } catch (err) {
        next(err);
    }
};

// 유지보수 게시판 댓글 리스트
exports.getMaintenanceCommentList = async (req, res, next) => {
    const { list_no } = req.params;

    try {
        utilMiddleware.validateIdx(list_no, 'list_no');

        const result = await i_comment.findAll({
            where: {
                list_no: list_no,
            },
            order: [['c_list_no', 'ASC']],
            attributes: ['c_list_no', 'list_no', 'c_name', 'c_wdate', 'c_content'],
        });

        const resultObj = result.map(list => ({
            c_list_no: list.c_list_no,
            list_no: list.list_no,
            c_name: list.c_name,
            c_wdate: moment.utc(list.c_wdate).format('YYYY.MM.DD HH:mm'),
            c_content: list.c_content,
        }));

        return errorHandler.successThrow(res, '', resultObj);
    } catch (err) {
        next(err);
    }
};

// 유지보수 첨부파일 다운로드
exports.getFileDownload = async (req, res, next) => {
    const { list_no } = req.params;

    try {
        utilMiddleware.validateIdx(list_no, 'list_no');

        const boardFile = await ib_admin.findOne({
            where: {
                list_no: list_no,
            },
            attributes: ['b_file'],
        });

        if (!boardFile) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        const fileUrl = 'https://adn.likeweb.co.kr/upload/admin/' + boardFile.b_file;

        const response = await axios({
            method: 'get',
            url: fileUrl,
            responseType: 'stream',
        });

        const fileName = path.basename(fileUrl);

        res.setHeader('Content-Disposition', 'attachment; filename=' + encodeURI(fileName));
        res.setHeader('Content-Type', 'application/octet-stream');

        response.data.pipe(res);
    } catch (err) {
        next(err);
    }
};
