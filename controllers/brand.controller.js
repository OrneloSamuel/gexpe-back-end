const Brand = require('../models/brand.model');
const {
    validationResult
} = require('express-validator');
const BrandMessages = require("../messages/brand.messages");

exports.get = (req, res) => {

    Brand.find(req.query, (error, brands) => {
        if (error) throw error;

        let message = BrandMessages.success.s2;

        if (brands.length < 0)
            message = BrandMessages.success.s5;

        message.body = brands;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Brand({
        name: req.body.name,
        accountNumber: req.body.accountNumber,
        abbreviation: req.body.abbreviation,
        iban: req.body.iban
    }).save((error, brand) => {
        if (error) throw error;
        let message = BrandMessages.success.s0;
        message.body = brand;
        return res.header("location", "/brands/" + brand._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Brand.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, brand) => {
        if (error) throw error;
        if (!brand) return res.status(BrandMessages.error.e0.http).send(BrandMessages.error.e0);

        let message = BrandMessages.success.s1;
        message.body = brand;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Brand.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(BrandMessages.error.e0.http).send(BrandMessages.error.e0);
        return res.status(BrandMessages.success.s3.http).send(BrandMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Brand.findOne({
        _id: req.params.id
    }, (error, brand) => {
        if (error) throw error;
        if (!brand) return res.status(BrandMessages.error.e0.http).send(BrandMessages.error.e0);
        let message = BrandMessages.success.s2;
        message.body = brand;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Brand.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(BrandMessages.error.e0.http).send(BrandMessages.error.e0);
        return res.status(BrandMessages.success.s6.http).send(BrandMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Brand.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(BrandMessages.error.e0.http).send(BrandMessages.error.e0);
        return res.status(BrandMessages.success.s4.http).send(BrandMessages.success.s4);

    });
}