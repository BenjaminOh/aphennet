const moment = require('moment');
const { Op, Sequelize } = require('sequelize');
const { i_category, sequelize, mariaDBSequelize } = require('../models');
const errorHandler = require('../middleware/error');
const enumConfig = require('../middleware/enum');
const multerMiddleware = require('../middleware/multer');
const utilMiddleware = require('../middleware/util');

// Get Menu List
// 2023.08.31 ash
exports.getCategoryList = async (req, res, next) => {
    const c_lang = req.query.c_lang || enumConfig.langType.KR[0];

    try {
        const categoryListY = await i_category.findAll({
            where: {
                c_use_yn: { [Op.in]: [enumConfig.useType.Y[0], enumConfig.useType.N[0]] },
                c_lang: c_lang,
            },
            attributes: [
                'id',
                'c_depth',
                'c_depth_parent',
                'c_num',
                'c_name',
                'c_use_yn',
                'c_main_banner',
                'c_main_banner_file',
                'c_menu_ui',
                'c_menu_on_img',
                'c_menu_off_img',
                'c_content_type',
                'c_lang',
                'c_link_target',
                'c_link_url',
            ],
            order: [
                ['c_depth', 'ASC'],
                ['c_num', 'ASC'],
            ],
        });

        if (!categoryListY) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        // const categoryListN = await i_category.findAll({
        //     where: {
        //         c_use_yn: enumConfig.useType.N[0],
        //         c_lang: c_lang,
        //     },
        //     attributes: [
        //         'id',
        //         'c_depth',
        //         'c_depth_parent',
        //         'c_num',
        //         'c_name',
        //         'c_use_yn',
        //         'c_main_banner',
        //         'c_main_banner_file',
        //         'c_menu_ui',
        //         'c_menu_on_img',
        //         'c_menu_off_img',
        //         'c_content_type',
        //         'c_lang',
        //     ],
        //     order: [
        //         ['c_depth', 'ASC'],
        //         ['c_num', 'ASC'],
        //     ],
        // });

        // const categoryListNResult = categoryListN.map(list => {
        //     const listObj = {
        //         id: list.id,
        //         c_depth: list.c_depth,
        //         c_depth_parent: list.c_depth_parent,
        //         c_num: list.c_num,
        //         c_name: list.c_name,
        //         c_main_banner: list.c_main_banner,
        //         c_main_banner_file: list.c_main_banner_file,
        //         c_menu_ui: list.c_menu_ui,
        //         c_menu_on_img: list.c_menu_on_img,
        //         c_menu_off_img: list.c_menu_off_img,
        //         c_content_type: utilMiddleware.mapContentType(list.c_content_type),
        //         c_lang: list.c_lang,
        //     };
        //     return listObj;
        // });

        const buildMenu = (menuItems, parentId) => {
            return menuItems
                .filter(item => item.c_depth_parent === parentId)
                .map(item => {
                    const submenu = buildMenu(menuItems, item.id);

                    if (submenu.length > 0) {
                        return {
                            id: item.id,
                            c_depth: item.c_depth,
                            c_depth_parent: item.c_depth_parent,
                            c_num: item.c_num,
                            c_name: item.c_name,
                            c_use_yn: item.c_use_yn,
                            c_main_banner: item.c_main_banner,
                            c_main_banner_file: item.c_main_banner_file,
                            c_menu_ui: item.c_menu_ui,
                            c_menu_on_img: item.c_menu_on_img,
                            c_menu_off_img: item.c_menu_off_img,
                            c_content_type: utilMiddleware.mapContentType(item.c_content_type),
                            c_lang: item.c_lang,
                            c_link_target: item.c_link_target,
                            c_link_url: item.c_link_url,
                            submenu,
                        };
                    } else {
                        return {
                            id: item.id,
                            c_depth: item.c_depth,
                            c_depth_parent: item.c_depth_parent,
                            c_num: item.c_num,
                            c_name: item.c_name,
                            c_use_yn: item.c_use_yn,
                            c_main_banner: item.c_main_banner,
                            c_main_banner_file: item.c_main_banner_file,
                            c_menu_ui: item.c_menu_ui,
                            c_menu_on_img: item.c_menu_on_img,
                            c_menu_off_img: item.c_menu_off_img,
                            c_content_type: utilMiddleware.mapContentType(item.c_content_type),
                            c_lang: item.c_lang,
                            c_link_target: item.c_link_target,
                            c_link_url: item.c_link_url,
                        };
                    }
                });
        };

        const resultObj = buildMenu(categoryListY, 0);

        // resultObj.push({
        //     id: '0',
        //     c_depth: '1',
        //     c_depth_parent: '0',
        //     c_num: '0',
        //     c_name: '미사용 카테고리',
        //     submenu: categoryListNResult,
        // });

        return errorHandler.successThrow(res, '', resultObj);
    } catch (err) {
        next(err);
    }
};

// Get Menu Create
// 2023.08.31 ash
exports.postCategoryCreate = async (req, res, next) => {
    const {
        c_depth,
        c_depth_parent,
        c_num,
        c_name,
        c_main_banner,
        c_main_banner_file,
        c_menu_ui,
        c_menu_on_img,
        c_menu_off_img,
        c_contents_type,
        c_use_yn,
        c_lang,
        c_link_target,
        c_link_url,
    } = req.body;

    try {
        let calculatedCNum = c_num;

        if (!c_num) {
            const categoryCount = await i_category.count({
                attributes: [[Sequelize.literal('count(*) + 1'), 'count']],
                where: {
                    c_depth: c_depth,
                    c_depth_parent: c_depth_parent,
                    c_use_yn: c_use_yn || enumConfig.useType.Y[0],
                    c_lang: c_lang || enumConfig.langType.KR[0],
                },
            });

            calculatedCNum = categoryCount;
        }

        const mainBannerFile = req.files['c_main_banner_file'];
        const menuOnImg = req.files['c_menu_on_img'];
        const menuOffImg = req.files['c_menu_off_img'];

        let mainBannerFilePath = null;
        let menuOnImgPath = null;
        let menuOffImgPath = null;

        if (mainBannerFile && mainBannerFile[0]) {
            mainBannerFilePath = mainBannerFile[0].path;
        }

        if (menuOnImg && menuOnImg[0]) {
            menuOnImgPath = menuOnImg[0].path;
        }

        if (menuOffImg && menuOffImg[0]) {
            menuOffImgPath = menuOffImg[0].path;
        }

        const categoryCreate = await i_category.create({
            c_depth: c_depth,
            c_depth_parent: c_depth_parent,
            c_num: calculatedCNum || 0,
            c_name: c_name,
            c_main_banner: c_main_banner,
            c_main_banner_file: mainBannerFilePath,
            c_menu_ui: c_menu_ui,
            c_menu_on_img: menuOnImgPath,
            c_menu_off_img: menuOffImgPath,
            c_contents_type: c_contents_type,
            c_use_yn: c_use_yn || enumConfig.useType.Y[0],
            c_lang: c_lang || enumConfig.langType.KR[0],
            c_link_target: c_link_target,
            c_link_url: c_link_url,
        });

        if (!categoryCreate) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        return errorHandler.successThrow(res, '', '');
    } catch (err) {
        next(err);
    }
};

// Post Menu View
// 2023.09.04 ash
exports.getCategoryView = async (req, res, next) => {
    const { id } = req.params;

    try {
        utilMiddleware.validateIdx(id, 'id');

        const result = await i_category.findByPk(id);

        if (!result) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        const resultObj = {
            id: result.id,
            c_depth: result.c_depth,
            c_depth_parent: result.c_depth_parent,
            c_num: result.c_num,
            c_name: result.c_name,
            c_main_banner:
                result.c_main_banner === enumConfig.bannerSizeType.COVER[0]
                    ? enumConfig.bannerSizeType.COVER
                    : result.c_main_banner === enumConfig.bannerSizeType.ORIGINAL[0]
                    ? enumConfig.bannerSizeType.ORIGINAL
                    : null,
            c_main_banner_file: result.c_main_banner_file,
            c_menu_ui:
                result.c_menu_ui === enumConfig.menuUiType.TXT[0]
                    ? enumConfig.menuUiType.TXT
                    : result.c_menu_ui === enumConfig.menuUiType.IMG[0]
                    ? enumConfig.menuUiType.IMG
                    : null,
            c_menu_on_img: result.c_menu_on_img,
            c_menu_off_img: result.c_menu_off_img,
            c_content_type: result.c_content_type,
            c_use_yn: result.c_use_yn,
            c_lang: result.c_lang,
            c_link_target:
                result.c_link_target === enumConfig.bannerLinkType.PARENT[0]
                    ? enumConfig.bannerLinkType.PARENT
                    : result.c_link_target === enumConfig.bannerLinkType.BLANK[0]
                    ? enumConfig.bannerLinkType.BLANK
                    : null,
            c_link_url: result.c_link_url,
        };

        return errorHandler.successThrow(res, '', resultObj);
    } catch (err) {
        next(err);
    }
};

// Put Menu Update //
// 2023.09.04 ash
exports.putCategoryUpdate = async (req, res, next) => {
    const {
        id,
        c_depth,
        c_depth_parent,
        c_num,
        c_name,
        c_main_banner,
        c_main_banner_file_del,
        c_menu_ui,
        c_menu_on_img,
        c_menu_off_img,
        c_contents_type,
        c_use_yn,
        c_lang,
        c_link_target,
        c_link_url,
    } = req.body;

    try {
        utilMiddleware.validateIdx(id, 'id');

        const result = await i_category.findByPk(id);

        if (!result) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        const mainBannerFile = req.files['c_main_banner_file'];
        const menuOnImg = req.files['c_menu_on_img'];
        const menuOffImg = req.files['c_menu_off_img'];

        let mainBannerFilePath = null;
        let menuOnImgPath = null;
        let menuOffImgPath = null;

        if (mainBannerFile && mainBannerFile[0]) {
            if (result.c_main_banner_file !== mainBannerFile[0].path && result.c_main_banner_file !== null) {
                await multerMiddleware.clearFile(result.c_main_banner_file);
            }
            mainBannerFilePath = mainBannerFile[0].path;
        } else {
            mainBannerFilePath = result.c_main_banner_file;
        }

        if (menuOnImg && menuOnImg[0]) {
            if (result.c_menu_on_img !== menuOnImg[0].path && result.c_menu_on_img !== null) {
                await multerMiddleware.clearFile(result.c_menu_on_img);
            }
            menuOnImgPath = menuOnImg[0].path;
        } else {
            menuOnImgPath = result.c_menu_on_img;
        }

        if (menuOffImg && menuOffImg[0]) {
            if (result.c_menu_off_img !== menuOffImg[0].path && result.c_menu_off_img !== null) {
                await multerMiddleware.clearFile(result.c_menu_off_img);
            }
            menuOffImgPath = menuOffImg[0].path;
        } else {
            menuOffImgPath = result.c_menu_off_img;
        }
        console.log(mainBannerFilePath);
        const menuUpdate = await i_category.update(
            {
                c_name: c_name,
                c_main_banner: c_main_banner,
                c_main_banner_file: c_main_banner_file_del === 'Y' ? null : mainBannerFilePath,
                c_menu_ui: c_menu_ui,
                c_menu_on_img: menuOnImgPath,
                c_menu_off_img: menuOffImgPath,
                c_use_yn: c_use_yn || enumConfig.useType.Y[0],
                c_link_target: c_link_target,
                c_link_url: c_link_url,
            },
            {
                where: {
                    id: id,
                },
            },
        );

        if (!menuUpdate) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        }

        return errorHandler.successThrow(res, '', menuUpdate);
    } catch (err) {
        next(err);
    }
};

// Delete Menu
// 2023.09.04 ash
exports.deleteCategoryDestroy = async (req, res, next) => {
    const { id } = req.body;

    try {
        utilMiddleware.validateIdx(id, 'id');

        //const menuView = await i_category.findByPk(id);

        // if (!menuView) {
        // 	return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        // }

        // if (menuView.c_main_banner_file) {
        //    await multerMiddleware.clearFile(menuView.c_main_banner_file);
        // }

        // if (menuView.c_menu_on_img) {
        //    await multerMiddleware.clearFile(menuView.c_menu_on_img);
        // }

        // if (menuView.c_menu_off_img) {
        //    await multerMiddleware.clearFile(menuView.c_menu_off_img);
        // }

        // const menuDelete = await i_category.destroy({
        //    where: {
        //       id: id,
        //    },
        // });

        // const menuDelete = await i_category.update(
        //     {
        //         c_use_yn: enumConfig.useType.D[0],
        //     },
        //     {
        //         where: {
        //             id: id,
        //         },
        //     },
        // );

        // if (!menuDelete) {
        //     return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
        // }

        async function getAllChildIds(parentIds) {
            const children = await i_category.findAll({
                attributes: ['id'],
                where: { c_depth_parent: { [Op.in]: parentIds } },
            });

            if (children.length === 0) return [];

            const childIds = children.map(c => c.id);
            return childIds.concat(await getAllChildIds(childIds));
        }

        const allIds = [id].concat(await getAllChildIds([id]));

        const menuDelete = await i_category.update(
            { c_use_yn: enumConfig.useType.D[0] },
            { where: { id: { [Op.in]: allIds } } },
        );

        return errorHandler.successThrow(res, '', menuDelete);
    } catch (err) {
        next(err);
    }
};

// Put Menu Move
// 2023.09.04 ash
exports.putMoveCategory = async (req, res, next) => {
    const { id, c_depth, c_depth_parent, c_num } = req.body;
    let transaction;

    try {
        utilMiddleware.validateIdx(id, 'id');

        transaction = await mariaDBSequelize.transaction();

        const result = await i_category.findByPk(id, { transaction });

        if (!result) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '메뉴 id 가 없습니다.');
        }

        if (result.c_depth !== parseInt(c_depth)) {
            return errorHandler.errorThrow(
                enumConfig.statusErrorCode._404_ERROR[0],
                'depth 가 다르면 이동이 안됩니다.',
            );
        }

        let moveDirection;
        if (c_num < result.c_num) {
            moveDirection = 'UP';
        }

        if (c_num > result.c_num) {
            moveDirection = 'DOWN';
        }

        if (moveDirection === 'UP') {
            await i_category.update(
                {
                    c_num: Sequelize.literal('c_num + 1'),
                },
                {
                    where: {
                        c_num: {
                            [Op.gte]: c_num,
                            [Op.lt]: result.c_num,
                        },
                        c_depth_parent: c_depth_parent,
                        c_use_yn: enumConfig.useType.Y[0],
                    },
                    transaction,
                },
            );
        }

        if (moveDirection === 'DOWN') {
            await i_category.update(
                {
                    c_num: Sequelize.literal('c_num - 1'),
                },
                {
                    where: {
                        c_num: {
                            [Op.gt]: result.c_num,
                            [Op.lte]: c_num,
                        },
                        c_depth_parent: c_depth_parent,
                        c_use_yn: enumConfig.useType.Y[0],
                    },
                    transaction,
                },
            );
        }

        await i_category.update(
            {
                c_num: c_num,
            },
            {
                where: {
                    id: id,
                },
                transaction,
            },
        );

        await transaction.commit();

        return errorHandler.successThrow(res, '', '');
    } catch (err) {
        if (transaction) {
            try {
                if (transaction.finished !== 'rollback' && transaction.finished !== 'commit') {
                    await transaction.rollback();
                }
            } catch (rollbackError) {
                console.error('Error rolling back transaction:', rollbackError);
            }
        }
        next(err);
    }
};

// 2023-12-12 카테고리이동시 마지막 번호로
exports.putMoveLastCategory = async (req, res, next) => {
    const { id, c_depth, c_depth_parent } = req.body;
    let transaction;

    try {
        utilMiddleware.validateIdx(id, 'id');

        transaction = await mariaDBSequelize.transaction();

        const result = await i_category.findByPk(id, { transaction });

        if (!result) {
            return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '메뉴 id 가 없습니다.');
        }

        if (result.c_depth !== parseInt(c_depth)) {
            return errorHandler.errorThrow(
                enumConfig.statusErrorCode._404_ERROR[0],
                'depth 가 다르면 이동이 안됩니다.',
            );
        }

        const maxNumResult = await i_category.findOne({
            attributes: [[Sequelize.fn('MAX', Sequelize.col('c_num')), 'maxNum']],
            where: {
                c_use_yn: enumConfig.useType.Y[0],
                c_depth_parent: c_depth_parent,
            },
            transaction,
        });

        await i_category.update(
            {
                c_num: maxNumResult.maxNum,
            },
            {
                where: {
                    id: id,
                },
                transaction,
            },
        );

        await transaction.commit();

        return errorHandler.successThrow(res, '', '');
    } catch (err) {
        if (transaction) {
            try {
                if (transaction.finished !== 'rollback' && transaction.finished !== 'commit') {
                    await transaction.rollback();
                }
            } catch (rollbackError) {
                console.error('Error rolling back transaction:', rollbackError);
            }
        }
        next(err);
    }
};

//카테고리 매핑
exports.putMappingCategory = async (req, res, next) => {
    const { id, c_depth, c_depth_parent, c_use_yn } = req.body;

    try {
        let menuMapping;

        await db.mariaDBSequelize.transaction(async transaction => {
            // const menuView = await i_category.findByPk(id);

            // if (!menuView) {
            // 	return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '메뉴 id 가 없습니다.');
            // }

            // if (menuView.c_depth === 1) {
            // 	return errorHandler.errorThrow(
            // 		enumConfig.statusErrorCode._404_ERROR[0],
            // 		'1 depth 메뉴는 매핑이 안됩니다.'
            // 	);
            // }

            const maxNumResult = await i_category.findOne({
                attributes: [[Sequelize.fn('MAX', Sequelize.col('c_num')), 'maxNum']],
                where: {
                    c_depth: c_depth,
                    c_use_yn: enumConfig.useType.Y[0],
                    c_depth_parent: c_depth_parent,
                },
                transaction,
            });

            const maxNum = maxNumResult.dataValues.maxNum || 0;
            const newNum = maxNum + 1;

            menuMapping = await i_category.update(
                {
                    c_depth: c_depth,
                    c_depth_parent: c_depth_parent,
                    c_num: c_use_yn === 'Y' ? newNum : Sequelize.literal('c_num'),
                    c_use_yn: c_use_yn,
                },
                {
                    where: {
                        c_depth: { [Op.ne]: 1 },
                        id: Array.isArray(id) ? { [Op.in]: id } : id,
                    },
                    transaction,
                },
            );

            if (!menuMapping) {
                return errorHandler.errorThrow(enumConfig.statusErrorCode._404_ERROR[0], '');
            }
        });

        return errorHandler.successThrow(res, '', menuMapping);
    } catch (err) {
        next(err);
    }
};
