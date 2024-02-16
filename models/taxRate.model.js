const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const taxRateSchema = new Schema({
  description: {
    type: String,
    default: null
  },
  taxPercentage: {
    type: Number,
    default: null
  },
  /*userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }*/
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.taxRate, taxRateSchema);
