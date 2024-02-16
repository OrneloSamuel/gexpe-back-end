const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const customerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tin: {
    type: String,
    default: null
  },
  idCard: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  phone: {
    type: Number,
    default: null
  },
  alternativePhone: {
    type: Number,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  withholdingTax: {
    type: Boolean,
    default: false
  },
  withholdingTaxPercentage: {
    type: Number,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  /*userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true
    default: null
  },*/
  naturalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Naturality',
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.customer, customerSchema);
