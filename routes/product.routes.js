const express = require('express');
let router = express.Router();
const ProductController = require('../controllers/product.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('description').isString(),
        body('unit').isAlpha(),
        //body('barcode').isInt(),
        //body('cost').isFloat(),
        body('price').isFloat(),
        body('taxRateId').isString(),
        //body('picture').isAlphanumeric(),
        body('reasonExemptionId').isString(),
        body('productCategoryId').isString(),
        body('brandId').isString(),
        //body('userId').isString(),
        //body('weight').isFloat(),
        body('minimumStock').isInt(),
        //body('currentStock').isInt(),
        body('expirationDate').isDate(),
        body('supplierId').isString(),
        body('type').isAlpha(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('unit').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('barcode').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('cost').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('price').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('taxRateId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('picture').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('reasonExemptionId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('productCategoryId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('brandId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('weight').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('minimumStock').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('currentStock').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('expirationDate').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('supplierId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('type').whitelist(CONFIG.sanitize.alphabet),
    ], ProductController.create)
    .get(ProductController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], ProductController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], ProductController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], ProductController.getOne)
    .put([param("id").isMongoId()], ProductController.update)
    .delete([param("id").isMongoId()], ProductController.delete);

module.exports = router;