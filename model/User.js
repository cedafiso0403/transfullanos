const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {OrderSchema} = require('./Order.js')

const UserSchema = new Schema({
    name: {type:String, required:true, maxLength: 30},
    email: {type:String, required:true, maxLength: 30},
    password: {type:String, required:true, maxLength: 100},
    dateOfBirth: {type:Date, required:true},
    orders: [OrderSchema]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;