const express = require('express');
let router = express.Router();
const CountyController = require('../controllers/county.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(CountyController.get)
    .post([body('name').isString(),
        body('provinceId').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('provinceId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ], CountyController.create);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], CountyController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], CountyController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], CountyController.getOne)
    .put([param("id").isMongoId()], CountyController.update)
    .delete([param("id").isMongoId()], CountyController.delete);

module.exports = router;