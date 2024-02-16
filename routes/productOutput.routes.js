const express = require('express');
let router = express.Router();
const ProductOutputController = require('../controllers/productOutput.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('productId').isString(),
        body('quantity').isInt(),
        body('outputReason').isString(),
        //body('userId').isString(),
        sanitizeBody('productId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('quantity').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('outputReason').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('userId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ], ProductOutputController.create)
    .get(ProductOutputController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], ProductOutputController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], ProductOutputController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], ProductOutputController.getOne)
    .put([param("id").isMongoId()], ProductOutputController.update)
    .delete([param("id").isMongoId()], ProductOutputController.delete);

module.exports = router;