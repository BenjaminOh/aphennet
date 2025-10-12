const express = require('express');
const router = express.Router();

const menuController = require('../controllers/menu');
const menuSubController = require('../controllers/menuSub');
const menuUserBoardGroupController = require('../controllers/menuUserBoardGroup');

const multerMiddleware = require('../middleware/multer');
const isAuthMiddleware = require('../middleware/is-auth');
const errorHandler = require('../middleware/error');

router.get('/', menuController.getCategoryList); // 메뉴 리스트

router.get('/:id', menuController.getCategoryView); //메뉴 내용

//
// Sub Menu
//

router.get('/sub/:id', menuSubController.getSubCategoryView); // 서브메뉴 내용

router.get('/boardGroup/:parent_id', menuUserBoardGroupController.getBoardGroupList); // 서브메뉴 게시판 구분 리스트

module.exports = router;
