const express=require("express")
const { createTheme, getAllThemes, updateAllThemes,createThemeReview, deleteThemeReview, getOneTheme,getAllReviews } = require("../controllers/themecontroller")
const { isAutheticatedUser,authorizedRole } = require("../middlewares/Authentication")

const router=express.Router()

router.route("/createtheme").post(createTheme)

router.route("/getallthemes").get(getAllThemes)

router.route("/updatemanythemes").put(updateAllThemes)

router.route("/createreview").post(createThemeReview)

router.route("/deletethemereview").delete(deleteThemeReview)

router.route("/getonetheme").get(getOneTheme)

router.route("/getallreviews").get(getAllReviews)

module.exports=router