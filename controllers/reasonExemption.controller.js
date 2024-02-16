const ReasonExemption = require('../models/reasonExemption.model');
const {
    validationResult
} = require('express-validator');
const ReasonExemptionMessages = require("../messages/reasonExemption.messages");

exports.get = (req, res) => {

    ReasonExemption.find(req.query).populate("reasonExemptions").exec((error, reasonExemptions) => {
        if (error) throw error;

        let message = ReasonExemptionMessages.success.s2;

        if (reasonExemptions.length < 0)
            message = ReasonExemptionMessages.success.s5;

        message.body = reasonExemptions;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new ReasonExemption({
        name: req.body.name,
        code: req.body.code
    }).save((error, reasonExemption) => {
        if (error) throw error;
        let message = ReasonExemptionMessages.success.s0;
        message.body = reasonExemption;
        return res.header("location", "/reason-exemptions/" + reasonExemption._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ReasonExemption.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, reasonExemption) => {
        if (error) throw error;
        if (!reasonExemption) return res.status(ReasonExemptionMessages.error.e0.http).send(ReasonExemptionMessages.error.e0);

        let message = ReasonExemptionMessages.success.s1;
        message.body = reasonExemption;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ReasonExemption.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ReasonExemptionMessages.error.e0.http).send(ReasonExemptionMessages.error.e0);
        return res.status(ReasonExemptionMessages.success.s3.http).send(ReasonExemptionMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ReasonExemption.findOne({
        _id: req.params.id
    }).populate("reasonExemptions").exec((error, reasonExemption) => {
        if (error) throw error;
        if (!reasonExemption) return res.status(ReasonExemptionMessages.error.e0.http).send(ReasonExemptionMessages.error.e0);
        let message = ReasonExemptionMessages.success.s2;
        message.body = reasonExemption;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ReasonExemption.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ReasonExemptionMessages.error.e0.http).send(ReasonExemptionMessages.error.e0);
        return res.status(ReasonExemptionMessages.success.s6.http).send(ReasonExemptionMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    ReasonExemption.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(ReasonExemptionMessages.error.e0.http).send(ReasonExemptionMessages.error.e0);
        return res.status(ReasonExemptionMessages.success.s4.http).send(ReasonExemptionMessages.success.s4);

    });
}