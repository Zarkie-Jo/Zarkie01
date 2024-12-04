const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const joinSchema = new mongoose.Schema(
    {
      event: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
      fullName: { type: String, required: true }, 
      email: { type: String, required: true },
      description: { type: String, required: true }, 
      reason: { type: String, required: true },
      commitment: {type: Boolean,default: false},
      isAccept: {type: Boolean,default: false},
      isDeleted: {type: Boolean,default: false},
    },
    { timestamps: true }
  );

module.exports = mongoose.model('Join', joinSchema);