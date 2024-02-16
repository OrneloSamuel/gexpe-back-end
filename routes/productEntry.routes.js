const express = require('express');
let router = express.Router();
const ProductEntryController = require('../controllers/productEntry.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('productId').isString(),
        body('supplierId').isString(),
        body('cost').isFloat(),
        body('price').isFloat(),
        body('quantity').isInt(),
        body('entryReason').isString(),
        //body('userId').isString(),
        body('expirationDate').isDate(),
        sanitizeBody('productId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('supplierId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('cost').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('price').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('quantity').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('entryReason').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('supplierId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('userId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('expirationDate').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], ProductEntryController.create)
    .get(ProductEntryController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], ProductEntryController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], ProductEntryController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], ProductEntryController.getOne)
    .put([param("id").isMongoId()], ProductEntryController.update)
    .delete([param("id").isMongoId()], ProductEntryController.delete);

module.exports = router;