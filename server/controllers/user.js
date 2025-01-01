import Hotel from "../models/Hotel.js"
import User from "../models/User.js"






//Update a User

export const updateUser = async(req,res,next)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, 
            {$set:req.body} ,{new:true} )
        return res.status(200).json(updateUser)
        
    } catch (error) {
       return res.status(500).json(error)
        
    }

}

// Delete a User

export const deleteUser = async(req,res,next)=>{
    
    try {
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("User Has been Deleted Successfully")
        
    } catch (error) {
       return res.status(500).json(error)
        
    }
}

// get a User

export const getUser = async(req,res,next)=>{
    try {
        const getUser = await User.findById(req.params.id )
        return res.status(200).json(getUser)
        
    } catch (error) {
       return res.status(500).json(error)
        
    }
}

// Get All User

export const getAllUsers = async(req,res,next)=>{
    try {
        const users = await User.find()
        return res.status(200).json(users)
        
    } catch (err) {
        next(err)
        
    }
}