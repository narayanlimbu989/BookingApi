import Room from "../Models/RoomModel.js";
import Hotel from "../Models/HotelModel.js";

// =======done
export const createroom = async (req, res, next) => {
  const { hotelid } = req.params;
  try {
    const hotel = await Hotel.findById(hotelid);
    if (hotel.hotelowner.valueOf() !== req.user.userId)
      return res.json({ message: " sorry you are not allowed!" });
    const newRoom = new Room({
      ...req.body,
      Hoteldetail: hotelid,
      postedby: req.user.userId,
    });
    const saveroom = await newRoom.save();
    await Hotel.findByIdAndUpdate(
      hotelid,
      {
        $push: {
          rooms: saveroom._id,
        },
      },
      { new: true }
    );
    res.json({ message: "success" });
  } catch (error) {
    next(error);
  }
};

// ====done
export const updateroom = async (req, res, next) => {
  try {
    const updateRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (updateRoom) {
      res.status(200).json({ updateRoom, message: "Successfully updated" });
    }
  } catch (error) {
    next(error);
  }
};
// ====done
export const deleteRoom = async (req, res, next) => {
  const { hotelid } = req.params;
  try {
    await Room.findByIdAndDelete(req.params.id);
    await Hotel.findByIdAndUpdate(
      hotelid,
      {
        $pull: {
          rooms: req.params.id,
        },
      },
      { new: true }
    );
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
};

// ====done
export const getroom = async (req, res, next) => {
  try {
    const getroom = await Room.findById(req.params.id);
    res.status(200).json(getroom);
  } catch (error) {
    next(error);
  }
};

// done
export const getallRoom = async (req, res, next) => {
  try {
    const getRoom = await Room.find();
    res.status(200).json(getRoom);
  } catch (error) {
    next(error);
  }
};

// ============only admin access
export const getalladminRoom = async (req, res, next) => {
  const userid = req.user.userId;
  try {
    const userRooms = await Room.find({ postedby: userid }).populate(
      "Hoteldetail"
    );
    res.status(200).json(userRooms);
  } catch (error) {
    next(error);
  }
};
