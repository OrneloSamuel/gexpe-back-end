const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const personSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  father: {
    type: String,
    default: null
  },
  mother: {
    type: String,
    default: null
  },
  naturalityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nationality',
    required: true
  },
  birthDate: {
    type: Date,
    default: null
  },
  street: {
    type: String,
    default: null
  },
  houseNumber: {
    type: String,
    default: null
  },
  district: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  idCard: {
    type: String,
    default: null
  },
  conservatoryArchive: {
    type: String,
    default: null
  },
  issueDate: {
    type: Date,
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
  picture: {
    type: String,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.person, personSchema);
