import express from "express";

import {
  adminlogin,
  Adminregister,
  changepassword,
  deleteuser,
  getalluser,
  getuser,
  loginUser,
  registerUser,
  updateuser,
  userhotellist,
} from "../controllers/UserControllers.js";
import { verifyIsadmin, verifytoken, verifyuser } from "../Service/Token.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/adminlogin", adminlogin);
router.post("/adminregister", Adminregister);

router.post("/changepassword", verifytoken, changepassword);

router.get("/userhotels", verifyIsadmin, userhotellist);
router.patch("/update/:id", verifytoken, verifyuser, updateuser);
router.get("/:id", verifyuser, getuser);
router.delete("/:id", verifyuser, deleteuser);
router.get("/", verifyIsadmin, getalluser);

export default router;
