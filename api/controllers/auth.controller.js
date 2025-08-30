import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../routes/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400,'All fields required.'));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json({
      status: 201,
      message: "User craeted successfully..",
    });
  } catch (error) {
    next(error);
  }
};
