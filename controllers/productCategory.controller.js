const ProductCategory = require('../models/productCategory.model');
const {
    validationResult
} = require('express-validator');
const ProductCategoryMessages = require("../messages/productCategory.messages");

exports.get = (req, res) => {

    ProductCategory.find(req.query).populate("productCategories").exec((error, productCategories) => {
        if (error) throw error;

        let message = ProductCategoryMessages.success.s2;

        if (productCategories.length < 0)
            message = ProductCategoryMessages.success.s5;

        message.body = productCategories;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new ProductCategory({
        name: req.body.name
    }).save((error, productCategory) => {
        if (error) throw error;
        let message = ProductCategoryMessages.success.s0;
        message.body = productCategory;
        return res.header("location", "/product-categories/" + productCategory._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductCategory.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, productCategory) => {
        if (error) throw error;
        if (!productCategory) return res.status(ProductCategoryMessages.error.e0.http).send(ProductCategoryMessages.error.e0);

        let message = ProductCategoryMessages.success.s1;
        message.body = productCategory;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductCategory.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ProductCategoryMessages.error.e0.http).send(ProductCategoryMessages.error.e0);
        return res.status(ProductCategoryMessages.success.s3.http).send(ProductCategoryMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductCategory.findOne({
        _id: req.params.id
    }).populate("productCategories").exec((error, productCategory) => {
        if (error) throw error;
        if (!productCategory) return res.status(ProductCategoryMessages.error.e0.http).send(ProductCategoryMessages.error.e0);
        let message = ProductCategoryMessages.success.s2;
        message.body = productCategory;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductCategory.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductCategoryMessages.error.e0.http).send(ProductCategoryMessages.error.e0);
        return res.status(ProductCategoryMessages.success.s6.http).send(ProductCategoryMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ProductCategory.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ProductCategoryMessages.error.e0.http).send(ProductCategoryMessages.error.e0);
        return res.status(ProductCategoryMessages.success.s4.http).send(ProductCategoryMessages.success.s4);

    });
}