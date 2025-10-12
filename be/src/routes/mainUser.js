const express = require('express');
const router = express.Router();

const bannerController = require('../controllers/banner');

router.get('/banner', bannerController.getBannerList); //배너 리스트


module.exports = router;
 