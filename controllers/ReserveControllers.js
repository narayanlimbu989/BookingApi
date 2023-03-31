import Hotel from "../Models/HotelModel.js";
import Reserve from "../Models/ReserveModel.js";
import Room from "../Models/RoomModel.js";
export const makereserve = async (req, res, next) => {
  const { person, allDates, selectedroom, userId } = req.body;
  try {
    const create = new Reserve({
      adult: person.adult,
      child: person.children,
      reserveDate: allDates,
      reserveHotel: req.params.id,
      reserveRooms: selectedroom,
      reserveby: userId,
    });
    await create.save();

    selectedroom.map(async (i) => {
      await Room.findByIdAndUpdate(i, {
        $set: {
          available: false,
        },
      });
    });

    return res.json({ message: "reserve success", reserve: true });
  } catch (error) {
    next(error);
  }
};

export const getreserve = async (req, res, next) => {
  try {
    const reserve = await Reserve.find({ reserveby: req.params.id })
      .populate("reserveRooms")
      .populate("reserveHotel");
    res.json(reserve);
  } catch (error) {
    next(error);
  }
};

export const cancelreservation = async (req, res, next) => {
  try {
    const reserve = (await Reserve.find({ _id: req.params.id })).map(
      (i) => i.reserveRooms
    );
    const onRooms = reserve[0].map(async (i) => {
      await Room.findByIdAndUpdate(i, {
        $set: {
          available: true,
        },
      });
    });
    if (!onRooms) {
      return res.json({ message: "try again" });
    }
    const deleteRserve = await Reserve.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!deleteRserve) {
      return res.json({ message: "try again" });
    }
    res.json({ message: "Cancel Reservation", cancel: true });
  } catch (error) {
    next(error);
  }
};

// ==========================for admin
export const getHotelreservation = async (req, res, next) => {
  const userid = req.user.userId;
  try {
    const userhotelList = (await Hotel.find({ hotelowner: userid })).map(
      (i) => i._id
    );

    const reserveRooms = await Reserve.find({
      reserveHotel: { $in: userhotelList },
    })
      .populate("reserveHotel")
      .populate("reserveby")
      .populate("reserveRooms");

    res.json(reserveRooms);
  } catch (error) {
    next(error);
  }
};
