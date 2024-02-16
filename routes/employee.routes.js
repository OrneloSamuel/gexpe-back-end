const express = require('express');
let router = express.Router();
const EmployeeController = require('../controllers/employee.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('personId').isString(),
        body('qualifications').isString(),
        body('phone').isNumeric(),
        body('alterrnativePhone').isNumeric(),
        body('email').isAlpha(),
        body('inssNumber').isString(),
        body('inssDate').isDate(),
        sanitizeBody('personId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('qualifications').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('phone').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('alterrnativePhone').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('email').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('inssNumber').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('inssDate').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
    ], EmployeeController.create)
    .get(EmployeeController.get);

router.route("/deactivate/:id")
    .put([param("id").isMongoId()], EmployeeController.deactivate);

router.route("/activate/:id")
    .put([param("id").isMongoId()], EmployeeController.activate);

router.route('/:id')
    .get([param("id").isMongoId()], EmployeeController.getOne)
    .put([param("id").isMongoId()], EmployeeController.update)
    .delete([param("id").isMongoId()], EmployeeController.delete);

module.exports = router;