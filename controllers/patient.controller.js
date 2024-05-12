const Patient = require("../models/Patient");

const createReport = async(req,res) => {
    try {
        let {name,age,address,phone,examined_by,examined_for_disease,examined_date,patient_result,test_result} = req.body;
        console.log(req.body);
        if(!name || !age || !address || !phone || !examined_by || !examined_for_disease || !examined_date || !patient_result) {
            throw new Error('Some Fields Are Missing')
        }
        const newReport = new Patient({
            name: name,
            age:age,
            address:address,
            phone:phone,
            examined_by:examined_by,
            examined_for_disease:examined_for_disease,
            examined_date:examined_date,
            lab_id:req.user.id,
            patient_result:patient_result,
            test_result:test_result
        })
        const result = await newReport.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const updateReport = async(req,res) => {
    try {
        let {name,age,address,phone,examined_by,examined_for_disease,examined_date,patient_result,test_result} = req.body;
        if(!name || !age || !address || !phone || !examined_by || !examined_for_disease || !examined_date || !patient_result) {
            throw new Error('Some Fields Are Missing')
        }
        const updateReport = await Patient.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true});
        res.status(200).json(updateReport);
    } catch (error) {
        res.status(500).json(error.message)
    }
}

const getReports = async (req,res) => {
    try {
        let reports = await Patient.find({lab_id:req.user.id}).sort({ createdAt: -1 })
        if(!reports || !reports.length) throw new Error("No Reports Found");
        res.status(200).json(reports)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
module.exports = {
    createReport:createReport,
    getReports:getReports,
    updateReport:updateReport
}