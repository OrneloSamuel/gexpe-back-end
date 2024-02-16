const express = require('express');
let router = express.Router();
const CompanyController = require('../controllers/company.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(CompanyController.get)
    .post([body('name').isString(),
        body('tin').isString(),
        body('slogan').isString(),
        body('address').isString(),
        body('phone').isInt(),
        body('alternativePhone').isInt(),
        body('fax').isInt(),
        body('email').isEmail(),
        body('logo').isString(),
        //body('userId').isString(),
        body('code').isString(),
        body('active').isBoolean(),
        //body('naturalityId').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('tin').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('slogan').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('address').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('phone').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('alternativePhone').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('fax').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('logo').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        //sanitizeBody('userId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('code').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('active').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('naturalityId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], CompanyController.create)

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], CompanyController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], CompanyController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], CompanyController.getOne)
    .put([param("id").isMongoId()], CompanyController.update)
    .delete([param("id").isMongoId()], CompanyController.delete);

module.exports = router;