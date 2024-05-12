const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerLab = async (req, res) => {
    try {
        if (!req.body.name || !req.body.phone || !req.body.password || !req.body.address) {
            throw new Error("Some fields are missing")
        }
        let findLab = await User.findOne({ lab_name: req.body.name });
        if (findLab) {
            throw new Error('Lab with similar name already exists!');
        }
        const saltRounds = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            lab_name: req.body.name,
            phone: req.body.phone,
            password: hash,
            address:req.body.address
        })
        const savedUser = await newUser.save();
        const { password, ...data } = savedUser._doc;
        res.status(201).json(others);
    } catch (error) {
        res.status(500).json(error.message)
    }
};

const login = async (req, res) => {
    try {
        let findLab = await User.findOne({ lab_name: req.body.name });
        if (!findLab) {
            throw new Error('Invalid Lab Details!');
        }
        let matchPassword = bcrypt.compare(req.body.password, findLab.password);
        if (!matchPassword) {
            throw new Error('Wrong Credentials!');
        }
        const accessToken = jwt.sign({
            id:findLab._id
        },process.env.JWT_SECRET_KEY,{expiresIn:'3d'})
        const {password,...data} = findLab._doc;
        res.cookie("token", accessToken, { httpOnly: false, secure: true, sameSite: "none" });
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json(error.message)
    }
};

const logout = async (req,res) => {
    res.cookie("token", "", { httpOnly: false, secure: true, sameSite: "none" });
    res.status(200).json({ data: "logout successful" });
}
module.exports = {
    registerLab:registerLab,
    login: login,
    logout:logout
}