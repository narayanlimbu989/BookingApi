import bcrypt from "bcryptjs";

export const hashpassword = (password) => {
  return bcrypt.hashSync(password, 10);
};
