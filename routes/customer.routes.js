const express = require('express');
let router = express.Router();
const CustomerController = require('../controllers/customer.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(CustomerController.get)
    .post([body('name').isString(),
        body('tin').isString(),
        //body('idCard').isString(),
        body('address').isString(),
        body('phone').isInt(),
        //body('alternativePhone').isInt(),
        body('email').isEmail(),
        body('withholdingTax').isBoolean(),
        body('withholdingTaxPercentage').isFloat(),
        //body('userId').isString(),
        //body('naturalityId').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('tin').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('idCard').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('address').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('phone').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('alternativePhone').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('withholdingTax').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('withholdingTaxPercentage').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('naturalityId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], CustomerController.create);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], CustomerController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], CustomerController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], CustomerController.getOne)
    .put([param("id").isMongoId()], CustomerController.update)
    .delete([param("id").isMongoId()], CustomerController.delete);

module.exports = router;