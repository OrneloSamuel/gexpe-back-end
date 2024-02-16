const express = require('express');
let router = express.Router();
const PermissionController = require('../controllers/permission.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('name').isString(),
        body('description').isString(),
        sanitizeBody('name').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical)
    ], PermissionController.create)
    .get(PermissionController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], PermissionController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], PermissionController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], PermissionController.getOne)
    .put([param("id").isMongoId()], PermissionController.update)
    .delete([param("id").isMongoId()], PermissionController.delete);

module.exports = router;