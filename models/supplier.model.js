const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const supplierSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  tin: {
    type: String,
    default: null
  },
  address: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  fax: {
    type: Number,
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
  /*userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },*/
  naturalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Naturality',
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.supplier, supplierSchema);