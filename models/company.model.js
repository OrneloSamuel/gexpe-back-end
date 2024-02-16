const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const companySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  tin: {
    type: String,
    default: null
  },
  slogan: {
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
  fax: {
    type: Number,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  logo: {
    type: String,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  code: {
    type: String,
    default: null
  },
  active: {
    type: Boolean,
    default: null
  },
  naturalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Naturality',
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.company, companySchema);