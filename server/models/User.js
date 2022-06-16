const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  first_name: {
    type: String,
    required: true,

  },
  last_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  properties: [
   {
    type: Schema.Types.ObjectId,
    ref: "Property"
   }
]
});


const User = mongoose.model('User', UserSchema);

module.exports = User;