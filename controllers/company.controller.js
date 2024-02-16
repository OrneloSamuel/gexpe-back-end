const Company = require('../models/company.model');
const {
    validationResult
} = require('express-validator');
const CompanyMessages = require("../messages/company.messages");

exports.get = (req, res) => {
    Company.find(req.query, (error, companies) => {
        if (error) throw error;
        let message = CompanyMessages.success.s2;

        if (companies.length < 0)
            message = CompanyMessages.success.s5;

        message.body = companies;
        return res.status(message.http).send(message);
    });
}

exports.create = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Company({
        name: req.body.name,
        tin: req.body.tin,
        slogan: req.body.slogan,
        address: req.body.address,
        phone: req.body.phone,
        alternativePhone: req.body.alternativePhone,
        fax: req.body.fax,
        email: req.body.email,
        logo: req.body.logo,
        userId: req.body.userId,
        code: req.body.code,
        active: req.body.active,
        naturalityId: req.body.naturalityId
    }).save((error, company) => {
        if (error) throw error;
        let message = CompanyMessages.success.s0;
        message.body = company;
        return res.header("location", "/companies/" + company._id).status(message.http).send(message);
    });

}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Company.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, company) => {
        if (error) throw error;
        if (!company) return res.status(CompanyMessages.error.e0.http).send(CompanyMessages.error.e0);

        let message = CompanyMessages.success.s1;
        message.body = company;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Company.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(CompanyMessages.error.e0.http).send(CompanyMessages.error.e0);

        Company.updateMany({}, {
            $pull: {
                companies: req.params.id
            }
        }, (error) => {
            if (error) throw error;
            return res.status(CompanyMessages.success.s3.http).send(CompanyMessages.success.s3);
        });
    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Company.findOne({
        _id: req.params.id
    }, (error, company) => {
        if (error) throw error;
        if (!company) return res.status(CompanyMessages.error.e0.http).send(CompanyMessages.error.e0);
        let message = CompanyMessages.success.s2;
        message.body = company;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Company.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(CompanyMessages.error.e0.http).send(CompanyMessages.error.e0);
        return res.status(CompanyMessages.success.s6.http).send(CompanyMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Company.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(CompanyMessages.error.e0.http).send(CompanyMessages.error.e0);
        return res.status(CompanyMessages.success.s4.http).send(CompanyMessages.success.s4);

    });
}