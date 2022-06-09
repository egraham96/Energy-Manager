const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  __v: { 
    type: Number, 
    select: false,
},
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
  },
  password: {
    type: String,
    required: true,
  },
  properties: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },
});


const User = mongoose.model('User', UserSchema);

module.exports = User;