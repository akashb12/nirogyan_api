const mongoose = require('mongoose');
const TestSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:String,required:true},
    fasting:{type:String,required:true},
    normal_range:{type:String,required:true},
    abnormal_range:{type:String,required:true},
},{timestamps:true});

module.exports = mongoose.model('Test',TestSchema);