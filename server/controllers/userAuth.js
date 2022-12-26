const User=require("../models/User")
const ErrorHandler=require("../utils/ErrorHandler")
const sendToken=require("../utils/sendToken")


exports.register=async(req,res,next)=>{
    const {name,email,password,confirmpassword,phone1,phone2,role}= await req.body

    try {
        const user=await User.create({
            name,email,password,confirmpassword,phone1,phone2,role
        })
    
        if(user){
            sendToken(user,201,res)
        }
        if(!user){
            return next(new ErrorHandler("User could not be created",400))
        }
    } catch (error) {
        console.log(error)
        return next(new ErrorHandler(error.message,error.code))
    }
}


exports.login=async(req,res,next)=>{
    const {email,password}=await req.body;
    try {

        
    if(!email || !password ){
        await next(new ErrorHandler("Please enter email or password",400))
      }
        
        const user=await User.findOne({email}).select("+password")

        if(!user){
            return next(new ErrorHandler("Please enter valid email or passowrd",400))
        }else{
           const isMatched=await user.passwordMatcher(password)
           
           if(isMatched){
            sendToken(user,201,res)
           }else{
                return next(new ErrorHandler("Please enter valid email or passowrd",400))
           }
        }


    } catch (error) {
        // console.log(error)
        return next(new ErrorHandler(error.message,error.code||error.statuscode||error.statusCode))
    }
}

exports.getUserDetails=async(req,res,next)=>{
    const userID=req.header("userID")
    try {
        const user=await User.findById({_id:userID})
        if(!user){
            return next(new ErrorHandler("User not found",400))
        }else{
            return res.status(200).json({
                success:true,
                user
            })
        }
    } catch (error) {
        return next(new ErrorHandler(error,error.code))
    }
}

exports.addToCart=async(req,res,next)=>{
    const userID=req.header("userID")
    const themeID=req.header("themeID")
    try {
        const user=await User.findById({_id:userID})
        // const user2=await User.findByIdAndUpdate({_id:userID},{cart:themeID})
        if(user){
            console.log(user.cart)
            user.cart.push(themeID)
            console.log(user.cart)
            await user.save({validateBeforeSave:false})
            // res.status(200).json({
            //     success:true,
            // })
        }else{
            return next(new ErrorHandler("User not found",404))
        }
        
    } catch (error) {
        return next(new ErrorHandler(error,error.status))
    }
}