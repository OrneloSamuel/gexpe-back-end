const Bank = require('../models/bank.model');
const {
    validationResult
} = require('express-validator');
const BankMessages = require("../messages/bank.messages");

exports.get = (req, res) => {

    Bank.find(req.query, (error, banks) => {
        if (error) throw error;

        let message = BankMessages.success.s2;

        if (banks.length < 0)
            message = BankMessages.success.s5;

        message.body = banks;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Bank({
        name: req.body.name,
        accountNumber: req.body.accountNumber,
        abbreviation: req.body.abbreviation,
        iban: req.body.iban
    }).save((error, bank) => {
        if (error) throw error;
        let message = BankMessages.success.s0;
        message.body = bank;
        return res.header("location", "/banks/" + bank._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Bank.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, bank) => {
        if (error) throw error;
        if (!bank) return res.status(BankMessages.error.e0.http).send(BankMessages.error.e0);

        let message = BankMessages.success.s1;
        message.body = bank;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Bank.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(BankMessages.error.e0.http).send(BankMessages.error.e0);
        return res.status(BankMessages.success.s3.http).send(BankMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Bank.findOne({
        _id: req.params.id
    }, (error, bank) => {
        if (error) throw error;
        if (!bank) return res.status(BankMessages.error.e0.http).send(BankMessages.error.e0);
        let message = BankMessages.success.s2;
        message.body = bank;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Bank.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(BankMessages.error.e0.http).send(BankMessages.error.e0);
        return res.status(BankMessages.success.s6.http).send(BankMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Bank.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(BankMessages.error.e0.http).send(BankMessages.error.e0);
        return res.status(BankMessages.success.s4.http).send(BankMessages.success.s4);

    });
}