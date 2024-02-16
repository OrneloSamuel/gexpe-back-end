const ProductOutput = require('../models/productOutput.model');
const {
    validationResult
} = require('express-validator');
const ProductOutputMessages = require("../messages/productOutput.messages");

exports.get = (req, res) => {

    ProductOutput.find(req.query).populate("productOutputs").exec((error, productOutputs) => {
        if (error) throw error;

        let message = ProductOutputMessages.success.s2;

        if (productOutputs.length < 0)
            message = ProductOutputMessages.success.s5;

        message.body = productOutputs;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new ProductOutput({
        productId: req.body.productId,
        quantity: req.body.quantity,
        outputReason: req.body.outputReason,
        userId: req.body.userId,
    }).save((error, productOutput) => {
        if (error) throw error;
        let message = ProductOutputMessages.success.s0;
        message.body = productOutput;
        return res.header("location", "/product-outputs/" + productOutput._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductOutput.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, productOutput) => {
        if (error) throw error;
        if (!productOutput) return res.status(ProductOutputMessages.error.e0.http).send(ProductOutputMessages.error.e0);

        let message = ProductOutputMessages.success.s1;
        message.body = productOutput;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductOutput.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ProductOutputMessages.error.e0.http).send(ProductOutputMessages.error.e0);
        return res.status(ProductOutputMessages.success.s3.http).send(ProductOutputMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductOutput.findOne({
        _id: req.params.id
    }).populate("productOutputs").exec((error, productOutput) => {
        if (error) throw error;
        if (!productOutput) return res.status(ProductOutputMessages.error.e0.http).send(ProductOutputMessages.error.e0);
        let message = ProductOutputMessages.success.s2;
        message.body = productOutput;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductOutput.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductOutputMessages.error.e0.http).send(ProductOutputMessages.error.e0);
        return res.status(ProductOutputMessages.success.s6.http).send(ProductOutputMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductOutput.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductOutputMessages.error.e0.http).send(ProductOutputMessages.error.e0);
        return res.status(ProductOutputMessages.success.s4.http).send(ProductOutputMessages.success.s4);

    });
}