const Product = require("../database/models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatues");
const cloudinary = require('cloudinary');


//Create Product -- Admin
exports.createProduct = catchAsyncErrors( async (req,res,next)=>{
    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    const imagesLinks = [];
  
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
  
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success:true,
        product
    })
});

//Get All Products
exports.getAllproducts = catchAsyncErrors(async (req, res, next) => {
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();

    // Create an instance of ApiFeatures with the query and queryString
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter();

    // Execute the query to retrieve the products
    let products = await apiFeature.query;

    // Calculate the filtered products count
    let filteredProductsCount = products.length;

    // Apply pagination to the query
    apiFeature.pagination(resultPerPage);

    // Execute the paginated query
    products = await apiFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductsCount,
    });
});

//Get All Products --Admin
exports.getAdminProducts = catchAsyncErrors(async(req,res,next)=>{
    const products = await Product.find();

    res.status(200).json({
        success:true,
        products
    })
});


//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found" , 404))
    }

    res.status(200).json({
        success:true,
        product
    })
});

//Update Products --Admin Route
exports.updateProduct = catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler("Product Not Found" , 404))
    }

    let images = [];

    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }
  
    if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }
  
      const imagesLinks = [];
  
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "products",
        });
  
        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
  
      req.body.images = imagesLinks;
    }
  

    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })

    res.status(200).json({
        success:true,
        product
    })
});

//Delete Product --Admin
exports.deleteProduct= catchAsyncErrors(async (req,res,next)=>{
    let product = await Product.findById(req.params.id)
    if(!product){
        return next(new ErrorHandler("Product Not Found" , 404))
    }

     // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message:"Product Deleted Successfully"
    })
});

//Create or Update a review.
exports.createProductReview = catchAsyncErrors(async(req,res)=>{

const {rating,comment,productId} = req.body;
const review = {
    user : req.user._id,
    name:req.user.name,
    rating:Number(rating),
    comment,
}

const product = await Product.findById(productId);

const isReviewed = product.reviews && product.reviews.find(rev=>rev.user.toString() === req.user._id.toString())

if(isReviewed){
    product.reviews.forEach(rev=>{
        if(rev.user.toString() === req.user._id.toString()){
            rev.comment = comment;
            rev.rating=rating;
        }

    })


}
else{
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
}

let avg=0;
product.reviews.forEach(rev=>{
    avg=avg + Number(rev.rating);
})

product.ratings=avg/product.reviews.length;

await product.save();

res.status(200).json({
    success: true
})

});

//Get all Reviews of a product
exports.getAllReviews = catchAsyncErrors(async(req,res,next)=>{

    const product = await Product.findById(req.query.productId);

    if(!product){
        return next(new ErrorHandler("Product Not Found",404));
    }

    res.status(200).json({
        success:true,
        reviews:product.reviews
    });

});

//Delete Reviews
exports.deleteReviews = catchAsyncErrors(async (req,res,next)=>{

const product = await Product.findById(req.query.productId);

if(!product){
    return next(new ErrorHandler("Product Not Found" , 404));
}


const reviews = product.reviews.filter(rev=>rev._id.toString() !== req.query.id.toString())


let avg=0;
reviews.forEach(rev=>{
    avg=avg + Number(rev.rating);
})

let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

const numOfReviews = reviews.length;

await Product.findByIdAndUpdate(req.query.productId,{
    reviews:reviews, numOfReviews:numOfReviews , ratings:ratings
},{
    new:true,
    runValidators:true,
    useFindAndModify:false
});

res.status(200).json({
    success:true
})

});