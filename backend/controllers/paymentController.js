const catchAsyncErrors = require('../middleware/catchAsyncErrors');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = catchAsyncErrors(async(req,res,next)=>{
    const payment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:'inr',
        metadata:{
            company:"Digi Depot"
        }
    });

    res.status(200).json({success:true,client_secret:payment.client_secret})
});

//We need API key in frontend.
exports.sendApiKey = catchAsyncErrors(async(req,res,next)=>{
    res.status(200).json({stripeApiKey:process.env.STRIPE_API_KEY});
});