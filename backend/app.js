const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require("body-parser");
const fileupload = require('express-fileupload');
const dotenv=require("dotenv");
const path = require("path");

//config
dotenv.config({path:"config/config.env"});


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'*'
}));
 app.use(fileupload());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(express.static(path.join(__dirname,"../frontend/build")));

//route imports
const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require('./routes/paymentRoute');

app.use("/api/v1",products);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.get("/",(req,res)=>{
    res.status(200).json({message:"hello"})
})

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})

//Middleware for Error Handling
app.use(errorMiddleware);

module.exports = app;