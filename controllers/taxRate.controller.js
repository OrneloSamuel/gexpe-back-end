const TaxRate = require('../models/taxRate.model');
const {
    validationResult
} = require('express-validator');
const TaxRateMessages = require("../messages/taxRate.messages");

exports.get = (req, res) => {

    TaxRate.find(req.query).populate("taxRates").exec((error, taxRates) => {
        if (error) throw error;

        let message = TaxRateMessages.success.s2;

        if (taxRates.length < 0)
            message = TaxRateMessages.success.s5;

        message.body = taxRates;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new TaxRate({
        description: req.body.description,
        taxPercentage: req.body.taxPercentage,
        userId: req.body.userId
    }).save((error, taxRate) => {
        if (error) throw error;
        let message = TaxRateMessages.success.s0;
        message.body = taxRate;
        return res.header("location", "/tax-rates/" + taxRate._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    TaxRate.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, taxRate) => {
        if (error) throw error;
        if (!taxRate) return res.status(TaxRateMessages.error.e0.http).send(TaxRateMessages.error.e0);

        let message = TaxRateMessages.success.s1;
        message.body = taxRate;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    TaxRate.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(TaxRateMessages.error.e0.http).send(TaxRateMessages.error.e0);
        return res.status(TaxRateMessages.success.s3.http).send(TaxRateMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    TaxRate.findOne({
        _id: req.params.id
    }).populate("taxRates").exec((error, taxRate) => {
        if (error) throw error;
        if (!taxRate) return res.status(TaxRateMessages.error.e0.http).send(TaxRateMessages.error.e0);
        let message = TaxRateMessages.success.s2;
        message.body = taxRate;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    TaxRate.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(TaxRateMessages.error.e0.http).send(TaxRateMessages.error.e0);
        return res.status(TaxRateMessages.success.s6.http).send(TaxRateMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    TaxRate.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(TaxRateMessages.error.e0.http).send(TaxRateMessages.error.e0);
        return res.status(TaxRateMessages.success.s4.http).send(TaxRateMessages.success.s4);

    });
}