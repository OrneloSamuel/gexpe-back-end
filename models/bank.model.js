const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const bankSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    default: null
  },
  abbreviation: {
    type: String,
    default: null
  },
  iban: {
    type: String,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.bank, bankSchema);
