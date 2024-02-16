const express = require('express');
let router = express.Router();
const RoleController = require('../controllers/role.controller');
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
    ], RoleController.create)
    .get(RoleController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], RoleController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], RoleController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], RoleController.getOne)
    .put([param("id").isMongoId()], RoleController.update)
    .delete([param("id").isMongoId()], RoleController.delete);

module.exports = router;