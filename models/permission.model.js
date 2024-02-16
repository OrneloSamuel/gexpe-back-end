const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const permissionSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.permission, permissionSchema);
