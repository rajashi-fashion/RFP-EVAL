const {Schema} = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new Schema({
    id:{type:String, required:true, unique:true},
    fname:{type:String, required:true},
    lname:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    empId:{type:String, required:true, unique:true},
    phone:{type:String},
    grade:{type:String},
    createdAt:{type:Date},
    updatedAt:{type:Date},
    createdBy:{type:String},
    updatedBy:{type:String},
});

const USER = mongoose.model('User', userSchema);

module.exports = USER;