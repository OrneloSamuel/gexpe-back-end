const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const countySchema = new Schema({
  name: {
    type: String,
    default: null,
    comment: 'nomeMunicipio'
  },
  provinceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province',
    default: null,
    comment: 'idProvincia'
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.county, countySchema);
