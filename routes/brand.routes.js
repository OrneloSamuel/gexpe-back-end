const express = require('express');
let router = express.Router();
const BrandController = require('../controllers/brand.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(BrandController.get)
    .post([body('name').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
    ], BrandController.create);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], BrandController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], BrandController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], BrandController.getOne)
    .put([param("id").isMongoId()], BrandController.update)
    .delete([param("id").isMongoId()], BrandController.delete);

module.exports = router;