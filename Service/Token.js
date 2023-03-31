import jwt from "jsonwebtoken";

export const createtoken = (data) => {
  return jwt.sign(data, process.env.Secret_key, { expiresIn: "30d" });
};

export const verifytoken = async (req, res, next) => {
  const token = req.headers.authorization;
  const accesstoken = token.split(" ").pop();
  try {
    if (!token) next({ message: "user are not authenticate" });
    jwt.verify(accesstoken, process.env.Secret_key, (err, user) => {
      if (err) next({ message: "Token is not valid" });
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};

export const verifyuser = async (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.userId === req.params.id) {
      next();
    } else {
      return next({ message: "you are not autorized" });
    }
  });
};

export const verifyIsadmin = async (req, res, next) => {
  verifytoken(req, res, next, () => {
    if (req.user.isAdmin === true) {
      next();
    } else {
      return next({ message: "you are not Admin" });
    }
  });
};
