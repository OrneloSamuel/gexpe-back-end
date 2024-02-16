const express = require('express');
let router = express.Router();
const BankController = require('../controllers/bank.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .get(BankController.get)
    .post([body('name').isString(),
        body('accountNumber').isString(),
        body('abbreviation').isString(),
        body('iban').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('accountNumber').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('abbreviation').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('iban').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], BankController.create);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], BankController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], BankController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], BankController.getOne)
    .put([param("id").isMongoId()], BankController.update)
    .delete([param("id").isMongoId()], BankController.delete);

module.exports = router;