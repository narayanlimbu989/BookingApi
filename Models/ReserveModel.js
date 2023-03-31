import mongoose from "mongoose";

const ReserveSchema = new mongoose.Schema(
  {
    adult: {
      type: Number,
      required: true,
    },
    child: {
      type: Number,
    },
    reserveDate: {
      type: [String],
      required: true,
    },
    reserveHotel:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotels",
    },
    reserveRooms: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "rooms",
    },
    reserveby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);
export default mongoose.model("reserves", ReserveSchema);
