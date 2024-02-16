const ProductEntry = require('../models/productEntry.model');
const {
    validationResult
} = require('express-validator');
const ProductEntryMessages = require("../messages/productEntry.messages");

exports.get = (req, res) => {

    ProductEntry.find(req.query).populate("productEntries").exec((error, productEntries) => {
        if (error) throw error;

        let message = ProductEntryMessages.success.s2;

        if (productEntries.length < 0)
            message = ProductEntryMessages.success.s5;

        message.body = productEntries;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new ProductEntry({
        productId: req.body.productId,
        supplierId: req.body.supplierId,
        cost: req.body.cost,
        price: req.body.price,
        quantity: req.body.quantity,
        entryReason: req.body.entryReason,
        userId: req.body.userId,
        expirationDate: req.body.expirationDate,
    }).save((error, productEntry) => {
        if (error) throw error;
        let message = ProductEntryMessages.success.s0;
        message.body = productEntry;
        return res.header("location", "/product-entries/" + productEntry._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductEntry.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, productEntry) => {
        if (error) throw error;
        if (!productEntry) return res.status(ProductEntryMessages.error.e0.http).send(ProductEntryMessages.error.e0);

        let message = ProductEntryMessages.success.s1;
        message.body = productEntry;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductEntry.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ProductEntryMessages.error.e0.http).send(ProductEntryMessages.error.e0);
        return res.status(ProductEntryMessages.success.s3.http).send(ProductEntryMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductEntry.findOne({
        _id: req.params.id
    }).populate("productEntries").exec((error, productEntry) => {
        if (error) throw error;
        if (!productEntry) return res.status(ProductEntryMessages.error.e0.http).send(ProductEntryMessages.error.e0);
        let message = ProductEntryMessages.success.s2;
        message.body = productEntry;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductEntry.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductEntryMessages.error.e0.http).send(ProductEntryMessages.error.e0);
        return res.status(ProductEntryMessages.success.s6.http).send(ProductEntryMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductEntry.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductEntryMessages.error.e0.http).send(ProductEntryMessages.error.e0);
        return res.status(ProductEntryMessages.success.s4.http).send(ProductEntryMessages.success.s4);

    });
}