const Province = require('../models/province.model');
const {
    validationResult
} = require('express-validator');
const ProvinceMessages = require("../messages/province.messages");

exports.get = (req, res) => {

    Province.find(req.query).populate("provinces").exec((error, provinces) => {
        if (error) throw error;
        let message = ProvinceMessages.success.s2;

        if (provinces.length < 0)
            message = ProvinceMessages.success.s5;

        message.body = provinces;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Province({
        name: req.body.name
    }).save((error, province) => {
        if (error) throw error;
        province.populate("provinces", (error) => {
            if (error) throw error;
            let message = ProvinceMessages.success.s0;
            message.body = province;
            return res.header("location", "/provinces/" + province._id).status(message.http).send(message);
        });

    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Province.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, province) => {
        if (error) throw error;
        if (!province) return res.status(ProvinceMessages.error.e0.http).send(ProvinceMessages.error.e0);
        province.populate("provinces", (error) => {
            if (error) throw error;
            let message = ProvinceMessages.success.s1;
            message.body = province;
            return res.status(message.http).send(message);
        });
    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Province.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(ProvinceMessages.error.e0.http).send(ProvinceMessages.error.e0);
        return res.status(ProvinceMessages.success.s3.http).send(ProvinceMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Province.findOne({
        _id: req.params.id
    }).populate("provinces").exec((error, province) => {
        if (error) throw error;
        if (!province) return res.status(ProvinceMessages.error.e0.http).send(ProvinceMessages.error.e0);
        let message = ProvinceMessages.success.s2;
        message.body = province;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Province.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(ProvinceMessages.error.e0.http).send(ProvinceMessages.error.e0);
        return res.status(ProvinceMessages.success.s6.http).send(ProvinceMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Province.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;
        
        if (result.n <= 0) return res.status(ProvinceMessages.error.e0.http).send(ProvinceMessages.error.e0);
        return res.status(ProvinceMessages.success.s4.http).send(ProvinceMessages.success.s4);

    });
}