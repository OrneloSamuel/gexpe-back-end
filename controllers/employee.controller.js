const Employee = require('../models/employee.model');
const {
    validationResult
} = require('express-validator');
const EmployeeMessages = require("../messages/employee.messages");

exports.get = (req, res) => {

    Employee.find(req.query, (error, employees) => {
        if (error) throw error;

        let message = EmployeeMessages.success.s2;

        if (employees.length < 0)
            message = EmployeeMessages.success.s5;

        message.body = employees;
        return res.status(message.http).send(message);
    });

}

exports.create = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    new Employee({
        personId: req.body.personId,
        qualifications: req.body.qualifications,
        phone: req.body.phone,
        alternativePhone: req.body.alternativePhone,
        email: req.body.email,
        inssNumber: req.body.inssNumber,
        inssDate: req.body.inssDate,
    }).save((error, employee) => {
        if (error) throw error;
        let message = EmployeeMessages.success.s0;
        message.body = employee;
        return res.header("location", "/employees/" + employee._id).status(message.http).send(message);
    });
}

exports.update = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Employee.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        new: true
    }, (error, employee) => {
        if (error) throw error;
        if (!employee) return res.status(EmployeeMessages.error.e0.http).send(EmployeeMessages.error.e0);

        let message = EmployeeMessages.success.s1;
        message.body = employee;
        return res.status(message.http).send(message);

    });
}

exports.delete = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Employee.deleteOne({
        _id: req.params.id
    }, (error, result) => {
        if (error) throw error;
        if (result.deletedCount <= 0) return res.status(EmployeeMessages.error.e0.http).send(EmployeeMessages.error.e0);
        return res.status(EmployeeMessages.success.s3.http).send(EmployeeMessages.success.s3);

    });
}

exports.getOne = (req, res) => {

    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Employee.findOne({
        _id: req.params.id
    }, (error, employee) => {
        if (error) throw error;
        if (!employee) return res.status(EmployeeMessages.error.e0.http).send(EmployeeMessages.error.e0);
        let message = EmployeeMessages.success.s2;
        message.body = employee;
        return res.status(message.http).send(message);
    });

}

exports.activate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Employee.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: true
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(EmployeeMessages.error.e0.http).send(EmployeeMessages.error.e0);
        return res.status(EmployeeMessages.success.s6.http).send(EmployeeMessages.success.s6);

    });
}

exports.deactivate = (req, res) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) return res.status(406).send(errors);

    Employee.updateOne({
        _id: req.params.id
    }, {
        $set: {
            active: false
        }
    }, (error, result) => {
        if (error) throw error;

        if (result.n <= 0) return res.status(EmployeeMessages.error.e0.http).send(EmployeeMessages.error.e0);
        return res.status(EmployeeMessages.success.s4.http).send(EmployeeMessages.success.s4);

    });
}