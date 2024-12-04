const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    fullName: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Member', memberSchema);