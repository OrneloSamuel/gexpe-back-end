const express = require('express');
let router = express.Router();
const PaymentMethodController = require('../controllers/paymentMethod.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('code').isAlpha(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('code').whitelist(CONFIG.sanitize.alphabet)
    ], PaymentMethodController.create)
    .get(PaymentMethodController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], PaymentMethodController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], PaymentMethodController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], PaymentMethodController.getOne)
    .put([param("id").isMongoId()], PaymentMethodController.update)
    .delete([param("id").isMongoId()], PaymentMethodController.delete);

module.exports = router;