
import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


//Create a Hotel

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        return res.status(200).json(savedHotel)

    } catch (err) {
        next(err)

    }

}

//Update a Hotel

export const updateHotel = async (req, res, next) => {
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body }, { new: true })
        return res.status(200).json(updateHotel)

    } catch (error) {
        return res.status(500).json(error)

    }

}

// Delete a Hotel

export const deleteHotel = async (req, res, next) => {

    try {
        await Hotel.findByIdAndDelete(req.params.id)
        return res.status(200).json("Hotels Has been Deleted Successfully")

    } catch (error) {
        return res.status(500).json(error)

    }
}

// get a Hotel

export const getHotel = async (req, res, next) => {
    try {
        const getHotel = await Hotel.findById(req.params.id)
        return res.status(200).json(getHotel)

    } catch (error) {
        return res.status(500).json(error)

    }
}

// Get All Hotels

export const getAllHotels = async (req, res, next) => {
     const limit = parseInt(req.query.limit) || 2; // Default limit is 2
     const min = parseInt(req.query.min) || 1;     // Default min price is 1
     const max = parseInt(req.query.max) || 500;  // Default max price is 200

     console.log(min, "==>> min");
     console.log(max, "==>> max");
     console.log(limit, "==>> limit");

    const excludingQueries = ['limit', 'min', 'max'];
    excludingQueries.forEach((que) => delete req.query[que]);

     console.log(req.query, "==>> Final Query Parameters");

    try {
        const Hotels = await Hotel.find({...req.query, cheapestPrice: { $gte: min, $lte: max } } ).limit(req.query.limit);

        return res.status(200).json(Hotels);
    } catch (err) {
        next(err);
    }
};

export const getCountByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city })
        }))
        return res.status(200).json(list)

    } catch (err) {
        next(err)

    }
}

export const getCountByType = async (req, res, next) => {


    try {
        const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        return res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ])

    } catch (err) {
        next(err)

    }
}


export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };
  