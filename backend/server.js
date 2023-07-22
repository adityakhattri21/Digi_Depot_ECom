const app = require("./app");
const dotenv=require("dotenv");
const cloudinary = require('cloudinary');
//config
dotenv.config({path:"config/config.env"});
//database
require("./database/conn");

//handling uncaughtException
process.on("uncaughtException" , (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to unCaughtException `);
    process.exit(1);
})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const port = process.env.PORT;

const server = app.listen(port , () =>{
    console.log(`Server is up and running on port ${port}`);
});

//Unhandled Promise Rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the Server due to unHandled Promise Rejection`);
    server.close(()=>{
        process.exit(1);
    });
});