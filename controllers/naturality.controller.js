const Naturality = require('../models/naturality.model');
const {
    validationResult
} = require('express-validator');
const NaturalityMessages = require("../messages/naturality.messages");

exports.get = (req, res) => {

    Naturality.find(req.query).populate("naturalities").exec((error, naturalities) => {
        if (error) throw error;
        let message = NaturalityMessages.success.s2;

        if (naturalities.length < 0)
            message = NaturalityMessages.success.s5;

        message.body = naturalities;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Naturality({
        name: req.body.name,
        countyId: req.body.countyId
    }).save((error, naturality) => {
        if (error) throw error;
        naturality.populate("naturalities", (error) => {
            if (error) throw error;
            let message = NaturalityMessages.success.s0;
            message.body = naturality;
            return res.header("location", "/naturalities/" + naturality._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Naturality.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, naturality) => {
        if (error) throw error;
        if (!naturality) return res.status(NaturalityMessages.error.e0.http).send(NaturalityMessages.error.e0);
        naturality.populate("naturalities", (error) => {
            if (error) throw error;
            let message = NaturalityMessages.success.s1;
            message.body = naturality;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Naturality.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(NaturalityMessages.error.e0.http).send(NaturalityMessages.error.e0);
        return res.status(NaturalityMessages.success.s3.http).send(NaturalityMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Naturality.findOne({
        _id: req.params.id
    }).populate("naturalities").exec((error, naturality) => {
        if (error) throw error;
        if (!naturality) return res.status(NaturalityMessages.error.e0.http).send(NaturalityMessages.error.e0);
        let message = NaturalityMessages.success.s2;
        message.body = naturality;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Naturality.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(NaturalityMessages.error.e0.http).send(NaturalityMessages.error.e0);
        return res.status(NaturalityMessages.success.s6.http).send(NaturalityMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Naturality.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(NaturalityMessages.error.e0.http).send(NaturalityMessages.error.e0);
        return res.status(NaturalityMessages.success.s4.http).send(NaturalityMessages.success.s4);

    });
}