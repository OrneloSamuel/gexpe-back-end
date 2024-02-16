const express = require('express');
let router = express.Router();
const ReasonExemptionController = require('../controllers/reasonExemption.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('code').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('code').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], ReasonExemptionController.create)
    .get(ReasonExemptionController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], ReasonExemptionController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], ReasonExemptionController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], ReasonExemptionController.getOne)
    .put([param("id").isMongoId()], ReasonExemptionController.update)
    .delete([param("id").isMongoId()], ReasonExemptionController.delete);

module.exports = router;