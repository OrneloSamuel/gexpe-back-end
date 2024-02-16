const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const provinceSchema = new Schema({
  name: {
    type: String,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.province, provinceSchema);
