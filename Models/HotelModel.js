import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  title: {
    type: String,
  },
  type: {
    type: String,
  },
  city: {
    type: String,
    lowercase: true,
  },
  address: {
    type: String,
  },
  distance: {
    type: String,
  },
  description: {
    type: String,
  },
  cheapestprice: {
    type: Number,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  photos: {
    type: [String],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rooms: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rooms",
      },
    ],
  },
  hotelowner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
export default mongoose.model("hotels", HotelSchema);
