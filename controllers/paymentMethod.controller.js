const PaymentMethod = require('../models/paymentMethod.model');
const {
    validationResult
} = require('express-validator');
const PaymentMethodMessages = require("../messages/paymentMethod.messages");

exports.get = (req, res) => {

    PaymentMethod.find(req.query).populate("paymentMethods").exec((error, paymentMethods) => {
        if (error) throw error;

        let message = PaymentMethodMessages.success.s2;

        if (paymentMethods.length < 0)
            message = PaymentMethodMessages.success.s5;

        message.body = paymentMethods;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new PaymentMethod({
        name: req.body.name,
        code: req.body.code
    }).save((error, paymentMethod) => {
        if (error) throw error;
        let message = PaymentMethodMessages.success.s0;
        message.body = paymentMethod;
        return res.header("location", "/payment-methods/" + paymentMethod._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    PaymentMethod.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, paymentMethod) => {
        if (error) throw error;
        if (!paymentMethod) return res.status(PaymentMethodMessages.error.e0.http).send(PaymentMethodMessages.error.e0);

        let message = PaymentMethodMessages.success.s1;
        message.body = paymentMethod;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    PaymentMethod.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(PaymentMethodMessages.error.e0.http).send(PaymentMethodMessages.error.e0);
        return res.status(PaymentMethodMessages.success.s3.http).send(PaymentMethodMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    PaymentMethod.findOne({
        _id: req.params.id
    }).populate("paymentMethods").exec((error, paymentMethod) => {
        if (error) throw error;
        if (!paymentMethod) return res.status(PaymentMethodMessages.error.e0.http).send(PaymentMethodMessages.error.e0);
        let message = PaymentMethodMessages.success.s2;
        message.body = paymentMethod;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    PaymentMethod.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(PaymentMethodMessages.error.e0.http).send(PaymentMethodMessages.error.e0);
        return res.status(PaymentMethodMessages.success.s6.http).send(PaymentMethodMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    PaymentMethod.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(PaymentMethodMessages.error.e0.http).send(PaymentMethodMessages.error.e0);
        return res.status(PaymentMethodMessages.success.s4.http).send(PaymentMethodMessages.success.s4);

    });
}