import express from "express";
import {
  deletehotel,
  deleteimages,
  deleteoldhotelimages,
  getallhotel,
  getbycities,
  gethotel,
  gethotelbytype,
  gethotelrooms,
  GetonlymyHotels,
  images,
  posthotel,
  updatehotel,
} from "../controllers/HotelControllers.js";
import { uploadImage } from "../Service/ImageUpload.js";
import { verifyIsadmin, verifytoken } from "../Service/Token.js";
const router = express.Router();

router.post("/", verifyIsadmin, posthotel);
router.put("/update/hotel/:hotelid", verifyIsadmin, updatehotel);
router.delete("/:id", verifyIsadmin, deletehotel);
router.get("/find/:id", gethotel);
router.get("/", getallhotel);
router.post("/images", uploadImage.array("images", 20), images);
router.delete("/deleteimage/:id", deleteimages);
router.delete("/deleteimage/:hotelid/:id", deleteoldhotelimages);

router.get("/onlyuserhotels", verifytoken, verifyIsadmin, GetonlymyHotels);

router.get("/countbycities", getbycities);
router.get("/countbytype", gethotelbytype);
router.get("/hotelsroom/:hotelid", gethotelrooms);

export default router;
