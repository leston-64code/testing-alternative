const express=require("express")
const { createCategory } = require("../controllers/categoryController")

const router=express.Router()

router.route("/createcategory").post(createCategory)

module.exports=router