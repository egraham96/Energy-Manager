const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    membership_start: {
        type: String,
        required: true,
    },
    units: {
        type: Schema.Types.ObjectId,
        ref: "Unit",
      },
});

const Property = mongoose.model('Property', PropertySchema);

module.exports = Property;