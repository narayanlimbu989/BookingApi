import Hotel from "../Models/HotelModel.js";
import fs from "fs";
import Room from "../Models/RoomModel.js";

// ===done
export const images = (req, res, next) => {
  if (req.files) return res.json(req.files);
  next({ message: "No images" });
};

// ===done
export const deleteimages = (req, res, next) => {
  const dete = fs.unlinkSync(`images/${req.params.id}`);

  if (dete === undefined) {
    return res.json({ message: "success" });
  }
  return next({ message: "try again" });
};

// ===done
export const deleteoldhotelimages = async (req, res, next) => {
  const hotel = await Hotel.findByIdAndUpdate(req.params.hotelid, {
    $pull: { photos: req.params.id },
  });
  if (hotel) {
    const dete = fs.unlinkSync(`images/${req.params.id}`);

    if (dete === undefined) {
      return res.json({ message: "success" });
    }
  }
  return next({ message: "try again" });
};
// ===done
export const posthotel = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const Hotalinfo = new Hotel({
      ...req.body.hotelinfo,
      photos: req.body.photos,
      hotelowner: userId,
    });
    const newHotel = await Hotalinfo.save();
    res.status(200).json({ newHotel, message: "Successfully added" });
  } catch (error) {
    next(error);
  }
};

// ==done
export const updatehotel = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.hotelid,
      {
        $set: {
          ...req.body.hotelinfo,
        },
        $push: {
          photos: req.body.photos,
        },
      },
      { new: true }
    );
    if (updateHotel) {
      res.status(200).json({ updateHotel, message: "Successfully updated" });
    }
  } catch (error) {
    next(error);
  }
};

// ==done
export const deletehotel = async (req, res, next) => {
  try {
    try {
      const hotelpic = (await Hotel.findById(req.params.id)).photos;
      const hotelrooms = (await Hotel.findById(req.params.id)).rooms;
      hotelrooms.map(async (i) => await Room.findByIdAndDelete(i));
      hotelpic.map((i) => fs.unlinkSync(`images/${i}`));
    } catch (error) {
    } finally {
      const hotelremove = await Hotel.findByIdAndDelete(req.params.id);
      if (hotelremove) {
        res.status(200).json({ message: "Hotel remove" });
      }
    }
  } catch (error) {
    next(error);
  }
};

// ===done
export const gethotel = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.id).populate("rooms");
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
};

// ===done
export const getallhotel = async (req, res, next) => {
  const { max, min, limit, ...others } = req.query;
  try {
    const getHotel = await Hotel.find({
      ...others,
      cheapestprice: { $gt: min || 1, $lt: max || 100000 },
    }).limit(limit);
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
};

// ===done
export const getbycities = async (req, res, next) => {
  try {
    const hotellist = await Hotel.find();
    const hotel = hotellist.map((i) => i.city);
    const counts = {};
    const merged = [].concat.apply([], hotel);
    merged.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const d = Object.entries(counts);
    res.status(200).json(d);
  } catch (error) {
    next(error);
  }
};

// ===done
export const gethotelbytype = async (req, res, next) => {
  try {
    const hotellist = await Hotel.find();
    const hotel = hotellist.map((i) => i.type);
    const counts = {};
    const merged = [].concat.apply([], hotel);
    merged.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });
    const d = Object.entries(counts);
    res.status(200).json(d);
  } catch (error) {
    next(error);
  }
};

// ===done
export const gethotelrooms = async (req, res, next) => {
  try {
    const getHotel = await Hotel.findById(req.params.hotelid).populate("rooms");
    res.status(200).json(getHotel.rooms);
  } catch (error) {
    next(error);
  }
};

// ======================================only Admin access

export const GetonlymyHotels = async (req, res, next) => {
  const userid = req.user.userId;
  try {
    const userHotels = await Hotel.find({ hotelowner: userid });
    res.json(userHotels);
  } catch (error) {
    next(error);
  }
};
