const County = require('../models/county.model');
const {
    validationResult
} = require('express-validator');
const CountyMessages = require("../messages/county.messages");

exports.get = (req, res) => {

    County.find(req.query, (error, counties) => {
        if (error) throw error;
        let message = CountyMessages.success.s2;

        if (counties.length < 0)
            message = CountyMessages.success.s5;

        message.body = counties;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new County({
        name: req.body.name,
        provinceId: req.body.provinceId
    }).save((error, county) => {
        if (error) throw error;
        county.populate("questions", (error) => {
            if (error) throw error;
            let message = CountyMessages.success.s0;
            message.body = county;
            return res.header("location", "/counties/" + county._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    County.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, county) => {
        if (error) throw error;
        if (!county) return res.status(CountyMessages.error.e0.http).send(CountyMessages.error.e0);
        county.populate("questions", (error) => {
            if (error) throw error;
            let message = CountyMessages.success.s1;
            message.body = county;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    County.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(CountyMessages.error.e0.http).send(CountyMessages.error.e0);
        return res.status(CountyMessages.success.s3.http).send(CountyMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    County.findOne({
        _id: req.params.id
    }).populate("questions").exec((error, county) => {
        if (error) throw error;
        if (!county) return res.status(CountyMessages.error.e0.http).send(CountyMessages.error.e0);
        let message = CountyMessages.success.s2;
        message.body = county;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    County.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(CountyMessages.error.e0.http).send(CountyMessages.error.e0);
        return res.status(CountyMessages.success.s6.http).send(CountyMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    County.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(CountyMessages.error.e0.http).send(CountyMessages.error.e0);
        return res.status(CountyMessages.success.s4.http).send(CountyMessages.success.s4);

    });
}