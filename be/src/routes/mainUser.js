const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/banner');
const popupController = require('../controllers/popup');

router.get('/banner', bannerController.getBannerList); //배너 리스트

router.get('/popup', popupController.getPopupList); //팝업 리스트

module.exports = router;
 