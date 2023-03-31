import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxpeople: {
      type: Number,
      required: true,
    },
    features: {
      type: String,
    },
    available: {
      type: Boolean,
      default: true,
    },
    roomNumber: {
      type: Number,
      required: true,
    },
    Hoteldetail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
    },
    postedby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("rooms", RoomSchema);
