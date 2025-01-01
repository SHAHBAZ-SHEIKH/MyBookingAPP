import User from "../models/User.js"
import bcrypt from "bcrypt"
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken"

export const register = async (req, res, next) => {

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ message: "This username is already taken." });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashPassword
        })

        await newUser.save()

        return res.status(200).send("User has been Cretaed Successfully")

    } catch (err) {
        next(err)

    }

}

export const loginHandler = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return next(createError(404, "User not found"));
        }


        const Ismatch = await bcrypt.compare(req.body.password, user.password);
        console.log("IsMatch", Ismatch)

        if (!Ismatch) {
            return next(createError(400, "Wrong Password or UserName"))
        }

        const token = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.jwt, { expiresIn: "24h" })

        const { password, isAdmin, ...otherDetails } = user._doc
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false, // Disable for local dev (use only HTTP)
            sameSite: "Strict"
        })
        res.status(200).json({ details: { ...otherDetails }, isAdmin })






    } catch (err) {
        next(err);
    }
};


