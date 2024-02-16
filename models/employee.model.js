const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const employeeSchema = new Schema({
  personId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Person',
    default: null,
    comment: 'idFuncionario'
  },
  qualifications: {
    type: String,
    default: null,
    comment: 'habilitacoes'
  },
  phone: {
    type: Number,
    default: null,
    comment: 'telefone'
  },
  alternativePhone: {
    type: Number,
    default: null,
    comment: 'telefone2'
  },
  email: {
    type: String,
    default: null
  },
  inssNumber: {
    type: String,
    default: null,
    comment: 'inssNumber'
  },
  inssDate: {
    type: Date,
    default: null,
    comment: 'inssDate'
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.employee, employeeSchema);