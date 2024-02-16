const Role = require('../models/role.model');
const {
    validationResult
} = require('express-validator');
const RoleMessages = require("../messages/role.messages");
const JWT = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.get = (req, res) => {

    Role.find(req.query, (error, roles) => {
        if (error) throw error;

        let message = RoleMessages.success.s2;

        if (roles.length < 0)
            message = RoleMessages.success.s5;

        message.body = roles;
        return res.status(message.http).send(message);
    });

}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Role.findOne({
        _id: req.params.id
    }, (error, role) => {
        if (error) throw error;
        if (!role) return res.status(RoleMessages.error.e1.http).send(RoleMessages.error.e1);
        let message = RoleMessages.success.s2;
        message.body = role;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Role.findOne({
        "auth.rolename": req.body.auth.rolename
    }, (error, role) => {
        if (error) throw error;
        if (role) return res.status(RoleMessages.error.e0.http).send(RoleMessages.error.e0)

        new Role({
            name: req.body.name,
            description: req.body.description
        }).save((error, role) => {
            if (error) throw error;

            let payload = {
                pk: role.auth.public_key
            }

            let options = {
                expiresIn: CONFIG.auth.expiration_time,
                issuer: CONFIG.auth.issuer
            };

            let token = JWT.sign(payload, role.auth.private_key, options);


            let message = RoleMessages.success.s0;
            message.body = role;
            return res.header("location", "/roles/" + role._id).header("Authorization", token).status(message.http).send(message);
        })
    });

}

exports.update = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Role.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, role) => {
        if (error) throw error;
        if (!role) return res.status(RoleMessages.error.e1.http).send(RoleMessages.error.e1);

        let message = RoleMessages.success.s1;
        message.body = role;
        return res.status(message.http).send(message);

    });

}

exports.delete = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Role.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(RoleMessages.error.e1.http).send(RoleMessages.error.e1);

        CashBox.updateMany({}, {
            $pull: {
                comments: {//roleId: req.params.id
                    role: req.params.id
                }
            }
        }, (error) => {
            if (error) throw error;
            return res.status(RoleMessages.success.s3.http).send(RoleMessages.success.s3);
        });
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Role.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(RoleMessages.error.e0.http).send(RoleMessages.error.e0);
        return res.status(RoleMessages.success.s6.http).send(RoleMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Role.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(RoleMessages.error.e0.http).send(RoleMessages.error.e0);
        return res.status(RoleMessages.success.s4.http).send(RoleMessages.success.s4);

    });
}