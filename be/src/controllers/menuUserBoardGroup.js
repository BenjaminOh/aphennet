const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { i_category, i_category_board_group, sequelize, i_category_board } = require('../models');
const errorHandler = require('../middleware/error');
const enumConfig = require('../middleware/enum');
const multerMiddleware = require('../middleware/multer');
const utilMiddleware = require('../middleware/util'); 
const db = require('../models');

// Get Category Group List
// 2023.09.06 ash
exports.getBoardGroupList = async (req, res, next) => {
	const { parent_id } = req.params;
	try {
		utilMiddleware.validateIdx(parent_id, 'parent_id');

		const categoryUseYN = await i_category.findOne({
			attributes: ['c_use_yn'],
			where: { id: parent_id },
			raw: true,
		});

		const categoryGroupList = await i_category_board_group.findAll({
			where: {
				parent_id: parent_id,
				use_yn: { [Op.in]: [enumConfig.useType.Y[0], enumConfig.useType.N[0]] },
			},
			attributes: [
				'id',
				'parent_id',
				'g_num',
				'all_board',
				'g_name',
				'g_menu_ui',
				'g_img_on',
				'g_img_off',
				'use_yn',
			],
			order: [['g_num', 'ASC']],
		});

		if (!categoryGroupList) {
			return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
		}

		const categoryGroupListResult = categoryGroupList.map((list) => {
			const listObj = {
				id: list.id,
				parent_id: list.parent_id,
				g_num: list.g_num,
				all_board: list.all_board,
				g_name: list.g_name,
				g_menu_ui: list.g_menu_ui,
				g_img_on: list.g_img_on,
				g_img_off: list.g_img_off,
				use_yn:
					list.use_yn === enumConfig.useType.Y[0]
						? enumConfig.useType.Y
						: enumConfig.useType.N,
			};
			return listObj;
		});

		if (categoryUseYN && categoryUseYN.c_use_yn === enumConfig.useType.Y[0]) {
			categoryGroupListResult.unshift({
				id: null,
				g_name: '전체',
			});
		}

		return errorHandler.successThrow(res, '', categoryGroupListResult);
	} catch (err) {
		next(err);
	}
};
