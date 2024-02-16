const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const invoiceSchema = new Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  invoiceType: {
    type: String,
    default: null,
    comment: 'FT, FR, ND, etc.'
  },
  invoiceNumber: {
    type: Number,
    default: null
  },
  invoiceDate: {
    type: Date,
    default: Date.now
  },
  amount: {
    type: Number,
    default: null
  },
  change: {
    type: Number,
    default: null
  },
  changeStatus: {
    type: Boolean,
    default: true
  },
  invoiceStatus: {
    type: String,
    default: 'N'
  },
  withholdingTaxAmount: {
    type: Number,
    default: null
  },
  hash: {
    type: String,
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  customer: {
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
  items: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      default: null
    },
    price: {
      type: Number,
      default: null
    },
    discountPercentage: {
      type: Number,
      default: null
    },
    discountAmount: {
      type: Number,
      default: null
    },
    totalAmount: {
      type: Number,
      default: null
    },
    product: {
      type: String,
      default: null
    },
    taxPercentage: {
      type: Number,
      default: null
    },
    reasonExemption: {
      type: String,
      default: null
    },
    reasonExemptionCode: {
      type: String,
      default: null
    }
  }],
  payments: [{
    bankId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bank',
      default: null
    },
    bank: {
      type: String,
      default: null
    },
    paymentMethodId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: true
    },
    paymentMethod: {
      type: String,
      default: null
    },
    amountPaid: {
      type: Number,
      default: null
    }
  }]
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.invoice, invoiceSchema);
