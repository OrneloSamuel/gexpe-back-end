const express = require('express');
let router = express.Router();
const ProvinceController = require('../controllers/province.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet)
    ], ProvinceController.create)
    .get(ProvinceController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], ProvinceController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], ProvinceController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], ProvinceController.getOne)
    .put([param("id").isMongoId()], ProvinceController.update)
    .delete([param("id").isMongoId()], ProvinceController.delete);

module.exports = router;