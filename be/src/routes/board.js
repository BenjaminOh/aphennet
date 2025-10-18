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

router.post('/reply', multerMiddleware.fileMulter, isAuthMiddleware.isAuthBoard, boardController.postBoardReplyUpdate); //게시글답변 등록

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
