const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  unit: {
    type: String,
    default: null
  },
  barcode: {
    type: Number,
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
  taxRateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TaxRate',
    default: null
  },
  picture: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  },
  reasonExemptionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReasonExemption',
    default: null
  },
  productCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductCategory',
    default: null
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  weight: {
    type: Number,
    default: null
  },
  minimumStock: {
    type: Number,
    default: null
  },
  currentStock: {
    type: Number,
    default: null
  },
  expirationDate: {
    type: Date,
    default: null
  },
  supplierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    default: null
  },
  type: {
    type: String,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.product, productSchema);