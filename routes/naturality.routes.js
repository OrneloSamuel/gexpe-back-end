const express = require('express');
let router = express.Router();
const NaturalityController = require('../controllers/naturality.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('countyId').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('countyId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], NaturalityController.create)
    .get(NaturalityController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], NaturalityController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], NaturalityController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], NaturalityController.getOne)
    .put([param("id").isMongoId()], NaturalityController.update)
    .delete([param("id").isMongoId()], NaturalityController.delete);

module.exports = router;