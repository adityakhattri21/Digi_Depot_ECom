const mongoose = require("mongoose");

// mongoose.connect(process.env.DB_URI,{useNewUrlParser:true,useUnifiedTopology:true})
// .then(()=>{
//     console.log(`Database connected with server`)
// })

mongoose.connect("mongodb://127.0.0.1:27017/digiDepot",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log(`Database connected with server`)
})
