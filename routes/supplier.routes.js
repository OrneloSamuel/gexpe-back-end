const express = require('express');
let router = express.Router();
const SupplierController = require('../controllers/supplier.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(SupplierController.get)
    .post([body('name').isString(),
        body('tin').isString(),
        body('address').isString(),
        body('email').isEmail(),
        body('fax').isInt(),
        body('phone').isInt(),
        body('alternativePhone').isInt(),
        //body('userId').isString(),
        //body('naturalityId').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('tin').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('address').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('fax').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('phone').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('alternativePhone').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('userId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
        //sanitizeBody('naturalityId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], SupplierController.create);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], SupplierController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], SupplierController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], SupplierController.getOne)
    .put([param("id").isMongoId()], SupplierController.update)
    .delete([param("id").isMongoId()], SupplierController.delete);

module.exports = router;