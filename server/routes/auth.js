import express from "express"
import { register ,loginHandler} from "../controllers/auth.js"

const authRouter = express.Router()

authRouter.post("/register",register)

authRouter.post("/login",loginHandler)

export default authRouter

