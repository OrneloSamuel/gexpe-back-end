const Permission = require('../models/permission.model');
const {
    validationResult
} = require('express-validator');
const PermissionMessages = require("../messages/permission.messages");

exports.get = (req, res) => {

    Permission.find(req.query).populate("permissions").exec((error, permissions) => {
        if (error) throw error;

        let message = PermissionMessages.success.s2;

        if (permissions.length < 0)
            message = PermissionMessages.success.s5;

        message.body = permissions;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Permission({
        name: req.body.name,
        description: req.body.description,
    }).save((error, permission) => {
        if (error) throw error;
        let message = PermissionMessages.success.s0;
        message.body = permission;
        return res.header("location", "/permissions/" + permission._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Permission.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, permission) => {
        if (error) throw error;
        if (!permission) return res.status(PermissionMessages.error.e0.http).send(PermissionMessages.error.e0);

        let message = PermissionMessages.success.s1;
        message.body = permission;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Permission.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(PermissionMessages.error.e0.http).send(PermissionMessages.error.e0);
        return res.status(PermissionMessages.success.s3.http).send(PermissionMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Permission.findOne({
        _id: req.params.id
    }).populate("permissions").exec((error, permission) => {
        if (error) throw error;
        if (!permission) return res.status(PermissionMessages.error.e0.http).send(PermissionMessages.error.e0);
        let message = PermissionMessages.success.s2;
        message.body = permission;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Permission.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(PermissionMessages.error.e0.http).send(PermissionMessages.error.e0);
        return res.status(PermissionMessages.success.s6.http).send(PermissionMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Permission.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(PermissionMessages.error.e0.http).send(PermissionMessages.error.e0);
        return res.status(PermissionMessages.success.s4.http).send(PermissionMessages.success.s4);

    });
}