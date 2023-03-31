import User from "../Models/UserModel.js";
import { hashpassword } from "../Service/managepassword.js";
import bcrypt from "bcryptjs";
import { UserDto } from "../Service/user-dtos.js";
import { createtoken } from "../Service/Token.js";
import Hotel from "../Models/HotelModel.js";

// done
export const registerUser = async (req, res, next) => {
  const { password, username, fullname, phone, email } = req.body;
  try {
    const check = await User.findOne({ username });
    if (check) return res.json({ message: "username already exit" });
    const hash = hashpassword(password);
    const user = new User({
      username,
      fullname,
      phone,
      email,
      password: hash,
    });
    await user.save();
    res.status(200).json({ message: "Successfully register", register: true });
  } catch (error) {
    next(error);
  }
};

// done
export const loginUser = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ message: "user not exit" });

    if (user.isAdmin !== false)
      return res.json({ message: "Sorry! you are not consumer" });

    const comparehash = bcrypt.compareSync(password, user.password);
    if (!comparehash) return res.json({ message: "invalid user details" });

    const token = createtoken({
      userId: user._id,
      isAdmin: user.isAdmin,
    });
    res.cookie("accesstoken", token, {
      maxAge: 30 * 30 * 24 * 60 * 60,
      HttpOnly: true,
    });

    const userinfo = new UserDto(user);
    return res.status(200).json({ token, authenticate: true, userinfo });
  } catch (error) {
    next(error);
  }
};
//change password
export const changepassword = async (req, res, next) => {
  try {
    const { currentpassword, newpassword, confirmpassword } = req.body;
    if (newpassword !== confirmpassword) {
      return res.json({
        message: "newpassword & confirmpassword should match",
      });
    }
    const currentuser = await User.findById(req.user.userId);
    if (currentuser) {
      const checkpassword = await bcrypt.compare(
        currentpassword,
        currentuser.password
      );
      if (!checkpassword) {
        return res.json({ message: "old password did not match" });
      }
      const newpasswordhash = await bcrypt.hash(newpassword, 10);
      await User.findByIdAndUpdate(currentuser._id, {
        password: newpasswordhash,
      });
      res.json({ message: "change password successfully", change: true });
    }
  } catch (error) {
    next(error);
  }
};

// admin register
export const Adminregister = async (req, res, next) => {
  const { password, username, fullname, phone, email } = req.body;
  try {
    const check = await User.findOne({ username });
    if (check) return res.json({ message: "username already exit" });
    const hash = hashpassword(password);
    const user = new User({
      username,
      fullname,
      phone,
      email,
      password: hash,
      isAdmin: true,
    });
    await user.save();
    res.status(200).json({ message: "Successfully register", register: true });
  } catch (error) {
    next(error);
  }
};

// adminlogin
export const adminlogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.json({ message: "user not exit" });

    if (user.isAdmin !== true)
      return res.json({ message: "Sorry! you are not Admin" });

    const comparehash = bcrypt.compareSync(password, user.password);
    if (!comparehash) return res.json({ message: "invalid user details" });

    const token = createtoken({
      userId: user._id,
      isAdmin: user.isAdmin,
    });
    res.cookie("accesstoken", token, {
      maxAge: 30 * 30 * 24 * 60 * 60,
      HttpOnly: true,
    });

    const userinfo = new UserDto(user);
    return res.status(200).json({ token, authenticate: true, userinfo });
  } catch (error) {
    next(error);
  }
};

//==done
export const updateuser = async (req, res, next) => {
  try {
    const updateuser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    const userinfo = new UserDto(updateuser);

    res.status(200).json({ userinfo, message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteuser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    next(error);
  }
};

export const getuser = async (req, res, next) => {
  try {
    const getuser = await User.findById(req.params.id);
    res.status(200).json(getuser);
  } catch (error) {
    next(error);
  }
};

export const getalluser = async (req, res, next) => {
  try {
    const getHotel = await User.find();
    res.status(200).json(getHotel);
  } catch (error) {
    next(error);
  }
};

export const userhotellist = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const userhotels = await Hotel.find({ hotelowner: userId });
    res.json(userhotels);
  } catch (error) {
    next(error);
  }
};
