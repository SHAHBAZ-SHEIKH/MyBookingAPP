import express from "express"
import { updateUser,deleteUser,getUser,getAllUsers } from "../controllers/user.js"
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js"

const usersRouter = express.Router()

// usersRouter.get("/checkAuthenticated",verifyToken,(req,res)=>{
//     console.log("req",req)
//     res.send("Hello you are Login")
// })

// usersRouter.get("/checkuser/:id",verifyUser,(req,res)=>{
//     res.send("Hello User Yor are Login and Can Delete Your Account")
// })

// usersRouter.get("/checkadmin/:id",verifyAdmin,(req,res)=>{
//     res.send("Hello admin Yor are Login and Can Delete all Account")
// })



// UPDATE

usersRouter.put("/:id",verifyUser,updateUser)

// DELETE

usersRouter.delete("/:id",verifyUser,deleteUser)

//GET

usersRouter.get("/:id",verifyUser,getUser)

// GET ALL

usersRouter.get("/",verifyAdmin,getAllUsers)


export default usersRouter

