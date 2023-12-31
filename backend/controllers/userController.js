const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../database/models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require('cloudinary');
const path = require('path');

//Register a user
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
        let myCloud;
    if(req.body.avatar === "/Profile.png"){
            const filePath = path.join(__dirname, "..",'assets', 'Profile.png'); // Adjust the file path to the correct location
             myCloud = await cloudinary.v2.uploader.upload(filePath,{
                folder:'avatar',
                width:150,
                crop:'scale'
            });
       
    }
    else{
         myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatar',
            width:150,
            crop:'scale'
        });
    }
    
    const {name,email,password} = req.body;


    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    });


   sendToken(user,201,res);
   
        console.log(error);

    
});

//Login User
exports.loginUser= catchAsyncErrors(async(req,res,next)=>{

    const {email,password} = req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = await User.findOne({email:email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }

    const isPasswordMatched = await  user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }


    sendToken(user,200,res)
});

//Logout User
exports.logout = catchAsyncErrors(async (req,res,next)=>{

    res.cookie("token",null,{
        Expires:new Date(Date.now()),
        httpOnly:true
    });


    res.status(200).json({
        success:true,
        message:"Logged Out Successfully."
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }

    //Get Reset Password Token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/passwords/reset/${resetToken}`;
    console.log(resetPasswordUrl);

    const message = `Your password reset URL is:- \n ${resetPasswordUrl}\nIf you have not requested this
    email please ignore it.`;

    try {

    await sendEmail({
        email:user.email,
        subject:`Digi Depot password Recovery`,
        message: message
    });

    res.status(200).json({
        success:true,
        message:`Email sent to ${user.email} successfully.`
    })
        
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message , 500));

    }

});

//Reset Password
exports.resetPassword = catchAsyncErrors(async (req,res,next)=>{

    console.log(req.params.token)
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const user = await User.findOne({
        resetPasswordToken ,
        resetPasswordExpire: {$gt:Date.now() }
    });

    if(!user){
        return next(new ErrorHandler("Reset Password Token is invalid or expired.",400))
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("Confirm Password does not match New Password",400))
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // sendToken(user , 200 ,res)
    res.status(200).json({
        success:true
    })
});

//Get User Details
exports.getUserDetails = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    });
})

//update user password
exports.updatePassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.user.id).select("+password");

    isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("Passwords does not match",400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user,200,res);

});

//Update user Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next)=>{

    const newUserData ={
        name:req.body.name,
        email:req.body.email
    };
    console.log(req.body.avatar);

    if(req.body.avatar !==""){
            const user = await User.findById(req.user.id);
        const imageId = user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageId);
        myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatar',
            width:150,
            crop:'scale'
        });

        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
        

        
    }

    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindandModify:false
    })

    res.status(200).json({
        success:true
    });


});

//Get All users --Admin
exports.getAllUsers = catchAsyncErrors(async(req,res,next)=>{

    const users = await User.find();

    res.status(200).json({
        success:true,
        users
    })

});

//Get Single user --Admin
exports.getSingleUser = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(`No User with Id: ${req.params.id} exists.`,404));
    }

    res.status(200).json({
        success:true,
        user
    })
    
});

//Update user Profile --Admin
exports.updateUserRole = catchAsyncErrors(async(req,res,next)=>{

    const newUserData ={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };


    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindandModify:false
    })

    if(!user){
        return next(new ErrorHandler(`No User with Id: ${req.params.id} exists.`,404));
    }

    res.status(200).json({
        success:true
    });


});

//Delete User --Admin
exports.deleteUser = catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }

  const imageId = user.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  await User.findByIdAndDelete(req.params.id);

  res.status(200).json({
    success: true,
    message: "User Deleted Successfully",
  });
})