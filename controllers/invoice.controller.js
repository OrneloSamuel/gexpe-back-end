const Invoice = require("../models/invoice.model");
const InvoiceMessages = require("../messages/invoice.messages");
const {
    validationResult
} = require('express-validator');

exports.get = (req, res) => {

    Invoice.find(req.query, (error, invoices) => {
        if (error) throw error;

        let message = InvoiceMessages.success.s2;

        if (invoices.length < 0)
            message = InvoiceMessages.success.s4;

        message.body = invoices;
        return res.status(message.http).send(message);
    });

}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Invoice.findOne({
        _id: req.params.id
    }, (error, invoice) => {
        if (error) throw error;
        if (!invoice) return res.status(InvoiceMessages.error.e0.http).send(InvoiceMessages.error.e0);
        let message = InvoiceMessages.success.s2;
        message.body = invoice;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Invoice({
        ustomerId: req.body.customerId,
        invoiceType: req.body.invoiceType,
        invoiceNumber: req.body.invoiceNumber,
        amount: req.body.amount,//Verify this and above
        change: req.body.change,
        changeStatus: req.body.changeStatus,
        invoiceStatus: req.body.invoiceStatus,
        withholdingTaxAmount: req.body.withholdingTaxAmount,
        hash: req.body.hash,
        userId: req.body.userId,
        description: req.body.description,
        customer: req.body.customer,
        tin: req.body.tin,
        address: req.body.address,
        items: req.body.items,
        payments: req.body.payments,
    }).save((error, invoice) => {
        if (error) throw error;

        let message = InvoiceMessages.success.s0;
        message.body = invoice;
        return res.header("location", "/invoices/" + invoice._id).status(message.http).send(message);
    })

}

exports.update = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Invoice.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, invoice) => {
        if (error) throw error;
        if (!invoice) return res.status(InvoiceMessages.error.e0.http).send(InvoiceMessages.error.e0);

        let message = InvoiceMessages.success.s1;
        message.body = invoice;
        return res.status(message.http).send(message);

    });

}

exports.delete = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Invoice.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(InvoiceMessages.error.e0.http).send(InvoiceMessages.error.e0);

        return res.status(InvoiceMessages.success.s3.http).send(InvoiceMessages.success.s3);

    });

}