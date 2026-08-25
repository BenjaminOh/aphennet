const express = require('express');
const router = express.Router();

const boardController = require('../controllers/board');

const multerMiddleware = require('../middleware/multer');
const isAuthMiddleware = require('../middleware/is-auth');
const errorHandler = require('../middleware/error');

router.get('/main/:category/:limit', boardController.getBoardMain); //게시글 메인 공지
router.get('/:category/:getLimit', boardController.getBoardList); //게시글 리스트
router.post('/myList', isAuthMiddleware.isAuth, boardController.postMyBoardList); //본인 게시글 리스트
router.get('/view/:category/:idx', boardController.getBoardView); //게시글 뷰페이지

router.post(
    '/',
    errorHandler.handleMulterUpload(multerMiddleware.fileMulter),
    isAuthMiddleware.isAuthBoard,
    boardController.postBoardCreate,
); //게시글 등록

// 에디터 본문 이미지 업로드 (관리자 콘솔 전용). 등록/수정보다 먼저 매칭되도록 위에 둔다.
router.post(
    '/editor-image',
    // 인증을 multer 앞에 둔다. 반대로 두면 인증 실패 요청도 파일을 디스크에 쓰고 나서야 거절된다.
    // (isAuthAdmin 은 Authorization 헤더만 보므로 body 파싱 전에 실행해도 된다.
    //  반면 isAuthBoard 는 req.body.category 를 읽어 multer 뒤에 있어야 한다)
    isAuthMiddleware.isAuthAdmin,
    errorHandler.handleMulterUpload(multerMiddleware.editorImageMulter),
    boardController.postEditorImage,
); //에디터 본문 이미지 업로드

router.post(
    '/reply',
    errorHandler.handleMulterUpload(multerMiddleware.fileMulter),
    isAuthMiddleware.isAuthBoard,
    boardController.postBoardReplyUpdate,
); //게시글답변 등록

router.put(
    '/',
    errorHandler.handleMulterUpload(multerMiddleware.fileMulter),
    isAuthMiddleware.isAuthBoard,
    boardController.putBoardUpdate,
); //게시글 수정

router.delete('/', isAuthMiddleware.isAuth, boardController.deleteBoardDestroy); //게시글 삭제

router.delete('/file', isAuthMiddleware.isAuth, boardController.deleteBoardFileDestroy); //게시첨부파일 삭제

router.post('/password', boardController.postBoardPassword); //게시글 비밀번호 확인

router.put('/move', isAuthMiddleware.isAuthAdmin, boardController.putBoardMove); //관리자 게시글 이동

router.put('/notice', isAuthMiddleware.isAuthAdmin, boardController.putBoardNotice); //관리자 게시글 공지 설정

router.get('/download/:category/:parent_idx/:idx', isAuthMiddleware.isAuthBoard, boardController.getFileDownload); //게시판 첨부파일 다운로드

router.put('/moveOrder', isAuthMiddleware.isAuthAdmin, boardController.putBoardMoveOrder); //게시판 리스트 순서변경

module.exports = router;
