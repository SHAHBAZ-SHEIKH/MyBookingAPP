import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import hotelsRouter from "./routes/hotels.js"
import roomsRouter from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

dotenv.config()




const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:3000'], // Add both frontends here
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));

const connectDB = async()=>{

    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connect to DB")
    } catch (error) {
        throw error
    }
    
}

// MiddlesWare

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth",authRouter)
app.use("/api/users",usersRouter)
app.use("/api/hotels",hotelsRouter)
app.use("/api/rooms",roomsRouter)


app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went Wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})


app.listen(3003,()=>{
    connectDB()
    console.log("Server in Running on Port 3003 ")
})