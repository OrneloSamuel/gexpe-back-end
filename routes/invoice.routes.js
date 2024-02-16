const express = require('express');
let router = express.Router();
const InvoiceController = require('../controllers/invoice.controller');
const {
    body,
    param,
    sanitizeBody
} = require('express-validator');
const CONFIG = require("../config/config");
const AuthController = require("../controllers/auth.controller");

router.route('/')
    .post([body('customerId').isString(),
        body('invoiceType').isAlpha(),
        body('amount').isFloat(),
        body('change').isFloat(),
        body('withholdingTaxAmount').isFloat(),
        //body('userId').isString(),
        body('customer').isString(),
        body('tin').isString(),
        body('address').isString(),
        body('items.*.productId').isString(),
        body('items.*.quantity').isInt(),
        body('items.*.price').isFloat(),
        body('items.*.discountPercentage').isFloat(),
        body('items.*.discountAmount').isFloat(),
        body('items.*.totalAmount').isFloat(),
        body('items.*.product').isString(),
        body('items.*.taxPercentage').isFloat(),
        body('items.*.reasonExemption').isString(),
        body('items.*.reasonExemptionCode').isString(),
        body('payments.*.bank').isString(),
        body('payments.*.paymentMethodId').isString(),
        body('payments.*.paymentMethod').isString(),
        body('payments.*.amountPaid').isFloat(),
        sanitizeBody('customerId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('invoiceType').whitelist(CONFIG.sanitize.alphabet),
        sanitizeBody('amount').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('change').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('withholdingTaxAmount').whitelist(CONFIG.sanitize.numerical),
        //sanitizeBody('userId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('description').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('customer').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('tin').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('address').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('items.*.productId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('items.*.quantity').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('items.*.price').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('items.*.discountPercentage').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('items.*.discountAmount').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('items.*.totalAmount').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('items.*.product').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('items.*.taxPercentage').whitelist(CONFIG.sanitize.numerical),
        sanitizeBody('items.*.reasonExemption').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('items.*.reasonExemptionCode').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('payments.*.bank').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('payments.*.paymentMethodId').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('payments.*.paymentMethod').whitelist(CONFIG.sanitize.alphabet + CONFIG.sanitize.numerical),
        sanitizeBody('payments.*.amountPaid').whitelist(CONFIG.sanitize.numerical)
    ], InvoiceController.create)
    .get(InvoiceController.get);

router.route('/:id')
    .get([param("id").isMongoId()], InvoiceController.getOne)
    .put([param("id").isMongoId()], InvoiceController.update)
    .delete([param("id").isMongoId()], InvoiceController.delete);

module.exports = router;