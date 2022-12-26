const express=require("express")
require("dotenv").config({path:"./config.env"})
const connectDB=require("./config/db")
const ErrorResponse=require("./middlewares/ErrorResponse")
const cookieParser=require("cookie-parser")
const cors=require("cors")


connectDB()
const app=express()

// app.use(cors({
//     origin:"https://myknot-official.netlify.app",
//     // credentials: true
// }))
app.use(cors({
    origin:"http://localhost:3000"
}))

app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb",extended:true}))


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",require("./routes/userRoutes.js"))
app.use("/api/img",require("./routes/imageRoutes.js"))
app.use("/api/themes",require("./routes/themeRoutes.js"))
app.use("/api/cart",require("./routes/cartRoutes.js"))
app.use("/api/payement",require("./routes/payementRoutes.js"))
app.use("/api/orders",require("./routes/orderRoutes.js"))
app.use("/api/category",require("./routes/categoryRoutes.js"))

app.use(ErrorResponse)


app.listen(process.env.PORT || 5000,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})