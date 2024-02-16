const Supplier = require('../models/supplier.model');
const {
    validationResult
} = require('express-validator');
const SupplierMessages = require("../messages/supplier.messages");

exports.get = (req, res) => {
    Supplier.find(req.query, (error, suppliers) => {
        if (error) throw error;
        let message = SupplierMessages.success.s2;

        if (suppliers.length < 0)
            message = SupplierMessages.success.s5;

        message.body = suppliers;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Supplier({
        name: req.body.name,
        tin: req.body.tin,
        address: req.body.address,
        email: req.body.email,
        fax: req.body.fax,
        phone: req.body.phone,
        alternativePhone: req.body.alternativePhone,
        //userId: req.body.userId,
        naturalityId: req.body.naturalityId
    }).save((error, supplier) => {
        if (error) throw error;
        let message = SupplierMessages.success.s0;
        message.body = supplier;
        return res.header("location", "/suppliers/" + supplier._id).status(message.http).send(message);
    });

}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Supplier.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, supplier) => {
        if (error) throw error;
        if (!supplier) return res.status(SupplierMessages.error.e0.http).send(SupplierMessages.error.e0);

        let message = SupplierMessages.success.s1;
        message.body = supplier;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Supplier.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(SupplierMessages.error.e0.http).send(SupplierMessages.error.e0);

        Supplier.updateMany({}, {
            $pull: {
                suppliers: req.params.id
            }
        }, (error) => {
            if (error) throw error;
            return res.status(SupplierMessages.success.s3.http).send(SupplierMessages.success.s3);
        });
    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Supplier.findOne({
        _id: req.params.id
    }, (error, supplier) => {
        if (error) throw error;
        if (!supplier) return res.status(SupplierMessages.error.e0.http).send(SupplierMessages.error.e0);
        let message = SupplierMessages.success.s2;
        message.body = supplier;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Supplier.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(SupplierMessages.error.e0.http).send(SupplierMessages.error.e0);
        return res.status(SupplierMessages.success.s6.http).send(SupplierMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Supplier.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(SupplierMessages.error.e0.http).send(SupplierMessages.error.e0);
        return res.status(SupplierMessages.success.s4.http).send(SupplierMessages.success.s4);

    });
}