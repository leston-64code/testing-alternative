

const sendToken=async (user,statusCode,res)=>{
    const token= await user.getSignedToken()


    // Options for cookie
    const options={
        expires:new Date(
            Date.now() +process.env.COOKIE_EXPIRE * 24 *60 *60 *1000
        ),
        httpOnly:true,
        // sameSite:"lax",
        sameSite:"none",
        secure:true
    }

    
    res.status(statusCode||200).cookie("token",token,options).json({
        success:true,
        token,
        user
    })
}


module.exports=sendToken