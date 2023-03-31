import express from "express";
import {
  createroom,
  deleteRoom,
  getalladminRoom,
  getallRoom,
  getroom,
  updateroom,
} from "../controllers/Roomcontrollers.js";

import { verifyIsadmin, verifytoken } from "../Service/Token.js";
const router = express.Router();

router.post("/admin/:hotelid", verifytoken, verifyIsadmin, createroom);
router.put("/:id", verifyIsadmin, updateroom);
router.get("/:id", getroom);
router.delete("/:id/:hotelid", verifyIsadmin, deleteRoom);
router.get("/", getallRoom);

router.get("/find/getuserrooms", verifytoken, verifyIsadmin, getalladminRoom);

export default router;
