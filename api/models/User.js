const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String,  required: true },

  password: String,
  isDeleted: { type: Boolean, default: false }
}, { 
    timestamps: true,
    versionKey: false 

 });

module.exports = mongoose.model('User', userSchema);
