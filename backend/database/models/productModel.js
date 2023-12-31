const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Product name"], //second one will run when first one will not run.
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description."]
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxLength:[6,"Price cannot exceed 6 figures"]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please Enter product Stock"],
        maxLength:[4,"Stock cannot be more than 4 figues."],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[{
        user:{
            type:mongoose.Schema.ObjectId,
            ref: "User",
            required:true
        },
        name:{
            type:String,
            required:[true,"Please Enter your name"]
        },
        rating:{
            type:String,
            required:[true,"Please Enter the rating"],
        },
        comment:{
            type:String,
            required:[true,"Please Ener the comment"]
        }
    }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model("Product",productSchema);