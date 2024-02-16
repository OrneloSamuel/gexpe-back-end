const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const paymentMethodSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.paymentMethod, paymentMethodSchema);
