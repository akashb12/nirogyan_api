const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const mongoose = require('mongoose');
const routes = require('./routes/routes')

dotenv.config();

let app = express();
app.use(cors({
    origin:["http://localhost:3000"],
    credentials:true
}));
app.use(express.json());
app.use('/api',routes)

mongoose.connect(process.env.MONGO_URL).then(()=> console.log("mongodb connected")).catch((err)=>console.log(err))

let port = process.env.PORT || 5000;
app.listen(port,()=> {
    console.log('server running on port ', port);
})