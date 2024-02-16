const mongoose = require('mongoose');

// Definir o esquema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
  },
  emailVerifiedAt: {
    type: Date,
    default: null
  },
  password: {
    type: String,
    default: null
  },
  rememberToken: {
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
  active: {
    type: Boolean,
    default: null
  },
  picture: {
    type: String,
    default: null
  }
});

// Criar e exportar o modelo associado ao esquema
const User = mongoose.model('User', userSchema);

module.exports = User;
