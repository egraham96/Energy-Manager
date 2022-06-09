const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnitSchema = new Schema({
    __v: { 
        type: Number, 
        select: false,
    },
    property: {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    consumption_amount: {
        type: String,
        required: true,
        trim: true,
    },
    consumption_price: {
        type: String,
        required: true,
    },
    discount:{
        type: String
    },
    discount_amount: {
        type: String
    },
    bill_date: {
        type: String,
        required:true,
    }
});

const Unit = mongoose.model('Unit', UnitSchema);

module.exports = Unit;