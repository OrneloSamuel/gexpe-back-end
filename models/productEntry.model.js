const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const productEntrySchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    default: null
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    default: null
  },
  cost: {
    type: Number,
    default: null
  },
  price: {
    type: Number,
    default: null
  },
  quantity: {
    type: Number,
    default: null
  },
  entryReason: {
    type: String,
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  expirationDate: {
    type: Date,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.productEntry, productEntrySchema);
