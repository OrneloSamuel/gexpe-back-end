const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const brandSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.brand, brandSchema);
