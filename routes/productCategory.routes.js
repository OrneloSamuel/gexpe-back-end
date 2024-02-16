const express = require('express');
let router = express.Router();
const ProductCategoryController = require('../controllers/productCategory.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], ProductCategoryController.create)
    .get(ProductCategoryController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], ProductCategoryController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], ProductCategoryController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], ProductCategoryController.getOne)
    .put([param("id").isMongoId()], ProductCategoryController.update)
    .delete([param("id").isMongoId()], ProductCategoryController.delete);

module.exports = router;