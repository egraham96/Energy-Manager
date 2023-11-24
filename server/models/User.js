const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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

// set up pre-save middleware to create password:

UserSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


const User = mongoose.model('User', UserSchema);

module.exports = User;