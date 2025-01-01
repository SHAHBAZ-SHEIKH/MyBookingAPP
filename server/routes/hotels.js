import express from "express"

import { createHotel, deleteHotel, getAllHotels, getHotel, updateHotel,getCountByCity ,getCountByType,getHotelRooms} from "../controllers/hotel.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const hotelsRouter = express.Router()

// CREATE

hotelsRouter.post("/",verifyAdmin, createHotel)

// UPDATE

hotelsRouter.put("/:id", verifyAdmin, updateHotel)

// DELETE

hotelsRouter.delete("/:id", verifyAdmin,deleteHotel)

//GET

hotelsRouter.get("/find/:id",getHotel)

// GET ALL

hotelsRouter.get("/",getAllHotels)

hotelsRouter.get("/countbyCity",getCountByCity)
hotelsRouter.get("/countbyType",getCountByType)
hotelsRouter.get("/room/:id", getHotelRooms);

export default hotelsRouter

