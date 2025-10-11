const express = require('express');
const router = express.Router();

const configController = require('../controllers/config');
const isAuthMiddleware = require('../middleware/is-auth');

router.get('/site/:site_id/:c_lang', configController.getConfigSite); // 사이트 정보

router.get(
	'/policy/:idx',
	//isAuthMiddleware.isAuthAdmin,
	configController.getConfigPolicyView
); //운영정책 내용

module.exports = router;
