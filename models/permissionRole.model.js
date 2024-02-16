const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const permissionRoleSchema = new Schema({
  permissionRoleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Permission',
    default: null
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: null
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.permissionRole, permissionRoleSchema);
