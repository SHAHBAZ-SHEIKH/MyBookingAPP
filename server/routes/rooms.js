import express from "express"
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom ,updateRoomAvailability} from "../controllers/room.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const roomsRouter = express.Router()

// CREATE

roomsRouter.post("/:hotelId",verifyAdmin, createRoom)

// UPDATE

roomsRouter.put("/:id", verifyAdmin, updateRoom)
roomsRouter.put("/availability/:id", updateRoomAvailability)

// DELETE

roomsRouter.delete("/:id/:hotelId", verifyAdmin,deleteRoom)

//GET

roomsRouter.get("/:id",getRoom)

// GET ALL

roomsRouter.get("/",getAllRooms)

export default roomsRouter

