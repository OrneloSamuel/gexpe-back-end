const express = require('express');
let router = express.Router();
const UserController = require('../controllers/user.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('email').isAlpha(),
        body('emailVerifiedAt').isDate(),
        body('password').isString(),
        body('rememberToken').isString(),
        body('createdAt').isDate(),
        body('updatedAt').isDate(),
        body('active').isBoolean(),
        body('picture').isAlphanumeric(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('email').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('emailVerifiedAt').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('password').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('rememberToken').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('createdAt').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('updatedAt').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('active').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('picture').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], UserController.create)
    .get(UserController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], UserController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], UserController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], UserController.getOne)
    .put([param("id").isMongoId()], UserController.update)
    .delete([param("id").isMongoId()], UserController.delete);

module.exports = router;