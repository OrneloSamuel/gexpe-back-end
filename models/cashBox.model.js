const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const cashBoxSchema = new Schema({
  description: {
    type: String,
    default: null
  },
  inputAmount: {
    type: Number,
    default: null
  },
  outputAmount: {
    type: Number,
    default: null
  },
  movementDate: {
    type: Date,
    default: null
  },
  movementTime: {
    type: String,
    default: null
  },
  movementType: {
    type: String,
    default: null
  },
  invoiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice',
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.cashBox, cashBoxSchema);
