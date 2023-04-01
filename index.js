import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import hotelrouter from "./Router/HotelsRouter.js";
import ErrorHandler from "./Service/Errorhandeling.js";
import userrouter from "./Router/UserRouter.js";
import roomrouter from "./Router/RoomRouter.js";
import Reserverouter from "./Router/ReserveRouter.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("Images"));
app.use(
  cors({
    credentials: true,
    origin: ["https://gregarious-starship-416dfa.netlify.app", "https://voluble-figolla-f6bb4a.netlify.app"],
  })
)
const port = process.env.PORT || 5000;
const url = process.env.URL;
mongoose
  .connect(url)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

app.use("/hotels/api", hotelrouter);
app.use("/users/api", userrouter);
app.use("/rooms/api", roomrouter);
app.use("/reserve/api", Reserverouter);

app.use(ErrorHandler);

app.listen(port, () => console.log(`listening ${port}`));
