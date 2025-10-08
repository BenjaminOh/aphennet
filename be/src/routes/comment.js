const express = require('express');
const router = express.Router();

const commentController = require('../controllers/comment');

const isAuthMiddleware = require('../middleware/is-auth');

router.get('/admin/:getLimit', isAuthMiddleware.isAuthAdmin, commentController.getCommentListAdmin); //관리자 댓글 리스트

router.get('/user/:category/:board_idx', isAuthMiddleware.isAuthBoard, commentController.getCommentList); //댓글 리스트

router.post('/user', isAuthMiddleware.isAuthBoard, commentController.postCommentCreate); //댓글 등록

router.put('/user', isAuthMiddleware.isAuthBoard, commentController.putCommentUpdate); //댓글 수정

router.delete('/user', isAuthMiddleware.isAuthBoard, commentController.deleteCommentDestroy); //댓글 삭제

router.delete('/adminDelete', isAuthMiddleware.isAuthAdmin, commentController.deleteCommentDestroy); //관리자 댓글 선택 삭제

router.post('/password', isAuthMiddleware.isAuthAdmin, commentController.postCommentPassword); //댓글 비밀번호 확인

module.exports = router;
