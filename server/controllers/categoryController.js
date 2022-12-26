const Category = require("../models/Category")
const ErrorHandler = require("../utils/ErrorHandler")

exports.createCategory=async(req,res,next)=>{
    try {
        const {name}=req.body
        
        const category=await Category.create({name})
        if(category){
            return res.status(200).json({
                success:true,
                category
            })
        }else{
            return next(new ErrorHandler("Category could not be created",404))
        }
    
    } catch (error) {
        return next(new ErrorHandler(error.message,error))
    }
}