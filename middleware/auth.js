const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next) => {
    const authHeader = req.header('authorization') || "";
    if(!authHeader) {
        return next(new Error("You Are Not Authenticated!"));
    } else {
        const token = authHeader.split(" ")[1];
        jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if(err) next(new Error("Invalid Token!"));
            req.user = user;
            next()
        })
    }
}
module.exports = {
    verifyToken:verifyToken
};