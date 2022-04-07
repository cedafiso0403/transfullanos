const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    weight: {type:Number, required:true},
    width: {type:Number, required:true},
    height: {type:Number, required:true},
    length: {type:Number, required:true},
    fromCountry: {type:String, required:true, maxLength: 30},
    fromCity: {type:String, required:true, maxLength: 30},
    toCountry: {type:String, required:true, maxLength: 30},
    toCity: {type:String, required:true, maxLength: 30},
    description : {type:String, required:true, maxLength: 200},
    date: Date,
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = {Order , OrderSchema};