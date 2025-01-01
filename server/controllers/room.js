
import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"


export const createRoom = async(req,res,next)=>{

    const hotelId = req.params.hotelId
    const newRooms = new Room(req.body)
    try {
        const savedRooms = await newRooms.save()

        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $push:{rooms: savedRooms._id}
            })
            res.status(200).json(savedRooms)
        } catch (error) {
            next(error)
            
        }


    } catch (error) {
        next(error)
        
    }

}


export const updateRoom = async(req,res,next)=>{
    try {
        const updateRoom = await Room.findByIdAndUpdate(req.params.id, 
            {$set:req.body} ,{new:true} )
        return res.status(200).json(updateRoom)
        
    } catch (error) {
       return res.status(500).json(error)
        
    }

}

export const updateRoomAvailability = async (req, res, next) => {
    console.log("req.body", req.body);
    try {
      await Room.updateOne({ "roomNumbers._id": req.params.id }, {$push: {"roomNumbers.$.unavailableDates": req.body.dates},});
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
  };

// Delete a Hotel

export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId
    
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            await Hotel.findByIdAndUpdate(hotelId,{
                $pull:{rooms:req.params.id}
            })
           
        } catch (error) {
            next(error)
            
        }
        return res.status(200).json("Rooms Has been Deleted Successfully")
        
    } catch (error) {
       return res.status(500).json(error)
        
    }
}

// get a Hotel

export const getRoom = async(req,res,next)=>{
    try {
        const getRoom = await Room.findById(req.params.id )
        return res.status(200).json(getRoom)
        
    } catch (error) {
       return res.status(500).json(error)
        
    }
}

// Get All Hotels

export const getAllRooms = async(req,res,next)=>{ 
    try {
        const Rooms = await Room.find()
        return res.status(200).json(Rooms)
        
    } catch (err) {
        next(err)
        
    }
}