const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const productCategorySchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.productCategory, productCategorySchema);
