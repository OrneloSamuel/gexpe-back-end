const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CONFIG = require('../config/config');

const naturalitySchema = new Schema({
  name: {
    type: String,
    default: null,
    comment: 'nomeNaturalidade'
  },
  countyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'County',
    default: null,
    comment: 'idMunicipio'
  }
});

module.exports = global.mongoConnection.model(CONFIG.mongodb.collections.naturality, naturalitySchema);
