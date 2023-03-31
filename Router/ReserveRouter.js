import express from "express";
import {
  cancelreservation,
  getHotelreservation,
  getreserve,
  makereserve,
} from "../controllers/ReserveControllers.js";
import { verifyIsadmin, verifytoken } from "../Service/Token.js";
const router = express.Router();

router.post("/reserveroom/:id", makereserve);
router.get(
  "/find/reservehotels",
  verifytoken,
  verifyIsadmin,
  getHotelreservation
);
router.get("/:id", getreserve);
router.delete("/cancel/:id", cancelreservation);

router.delete("/deletereserve/:id", verifyIsadmin, cancelreservation);

export default router;
