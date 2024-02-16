const Customer = require('../models/customer.model');
const {
    validationResult
} = require('express-validator');
const CustomerMessages = require("../messages/customer.messages");

exports.get = (req, res) => {
    Customer.find(req.query, (error, customers) => {
        if (error) throw error;
        let message = CustomerMessages.success.s2;

        if (customers.length < 0)
            message = CustomerMessages.success.s5;

        message.body = customers;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Customer({
        name: req.body.name,
        tin: req.body.tin,
        idCard: req.body.idCard,
        address: req.body.address,
        phone: req.body.phone,
        alternativePhone: req.body.alternativePhone,
        email: req.body.email,
        withholdingTax: req.body.withholdingTax,
        withholdingTaxPercentage: req.body.withholdingTaxPercentage,
        //userId: req.body.userId,
        naturalityId: req.body.naturalityId
    }).save((error, customer) => {
        if (error) throw error;
        let message = CustomerMessages.success.s0;
        message.body = customer;
        return res.header("location", "/customers/" + customer._id).status(message.http).send(message);
    });

}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Customer.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, customer) => {
        if (error) throw error;
        if (!customer) return res.status(CustomerMessages.error.e0.http).send(CustomerMessages.error.e0);

        let message = CustomerMessages.success.s1;
        message.body = customer;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Customer.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(CustomerMessages.error.e0.http).send(CustomerMessages.error.e0);

        Customer.updateMany({}, {
            $pull: {
                customers: req.params.id
            }
        }, (error) => {
            if (error) throw error;
            return res.status(CustomerMessages.success.s3.http).send(CustomerMessages.success.s3);
        });
    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Customer.findOne({
        _id: req.params.id
    }, (error, customer) => {
        if (error) throw error;
        if (!customer) return res.status(CustomerMessages.error.e0.http).send(CustomerMessages.error.e0);
        let message = CustomerMessages.success.s2;
        message.body = customer;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Customer.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(CustomerMessages.error.e0.http).send(CustomerMessages.error.e0);
        return res.status(CustomerMessages.success.s6.http).send(CustomerMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Customer.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(CustomerMessages.error.e0.http).send(CustomerMessages.error.e0);
        return res.status(CustomerMessages.success.s4.http).send(CustomerMessages.success.s4);

    });
}