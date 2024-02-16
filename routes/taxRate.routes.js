const express = require('express');
let router = express.Router();
const TaxRateController = require('../controllers/taxRate.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('description').isString(),
        body('taxPercentage').isFloat(),
        sanitizeBody('taxPercentage').whitelist(CONFIG.sanitize.numerical),
    ], TaxRateController.create)
    .get(TaxRateController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], TaxRateController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], TaxRateController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], TaxRateController.getOne)
    .put([param("id").isMongoId()], TaxRateController.update)
    .delete([param("id").isMongoId()], TaxRateController.delete);

module.exports = router;