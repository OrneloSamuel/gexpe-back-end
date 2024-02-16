const Product = require('../models/product.model');
const {
    validationResult
} = require('express-validator');
const ProductMessages = require("../messages/product.messages");

exports.get = (req, res) => {

    Product.find(req.query).populate("products").exec((error, products) => {
        if (error) throw error;

        let message = ProductMessages.success.s2;

        if (products.length < 0)
            message = ProductMessages.success.s5;

        message.body = products;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Product({
        name: req.body.name,
        description: req.body.description,
        unit: req.body.unit,
        barcode: req.body.barcode,
        cost: req.body.cost,
        price: req.body.price,
        taxrateId: req.body.taxrateId,
        picture: req.body.picture,
        reasonExemptionId: req.body.reasonExemptionId,
        brandId: req.body.brandId,
        userId: req.body.userId,
        weight: req.body.weight,
        minimumStock: req.body.minimumStock,
        currentStock: req.body.currentStock,
        expirationDate: req.body.expirationDate,
        supplierId: req.body.supplierId,
        type: req.body.type
    }).save((error, product) => {
        if (error) throw error;
        let message = ProductMessages.success.s0;
        message.body = product;
        return res.header("location", "/products/" + product._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Product.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, product) => {
        if (error) throw error;
        if (!product) return res.status(ProductMessages.error.e0.http).send(ProductMessages.error.e0);

        let message = ProductMessages.success.s1;
        message.body = product;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Product.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ProductMessages.error.e0.http).send(ProductMessages.error.e0);
        return res.status(ProductMessages.success.s3.http).send(ProductMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Product.findOne({
        _id: req.params.id
    }).populate("products").exec((error, product) => {
        if (error) throw error;
        if (!product) return res.status(ProductMessages.error.e0.http).send(ProductMessages.error.e0);
        let message = ProductMessages.success.s2;
        message.body = product;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Product.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductMessages.error.e0.http).send(ProductMessages.error.e0);
        return res.status(ProductMessages.success.s6.http).send(ProductMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Product.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductMessages.error.e0.http).send(ProductMessages.error.e0);
        return res.status(ProductMessages.success.s4.http).send(ProductMessages.success.s4);

    });
}