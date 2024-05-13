const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
    name:{type:String,required:true},
    age:{type:String,required:true},
    gender:{type:String,required:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    examined_by:{type:String,required:true},
    examined_for_disease:{type:String,required:true},
    examined_date:{type:String,required:true},
    lab_id:{type:mongoose.Schema.Types.ObjectId,ref: "User"},
    patient_result:[{
        id:{type:Number,required:true},
        test_name:{type:String,required:true},
        normal_range:{type:String,required:true},
        patient_value:{type:String,required:true},
    }],
    test_result:{type:String,required:true}

},{timestamps:true});
module.exports = mongoose.model('Patient',PatientSchema);