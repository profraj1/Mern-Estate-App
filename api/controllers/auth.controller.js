import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { customErrorHandler } from "../utils/error.handler.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    mobileNumber,
  });

  try {
    const validUser = await User.findOne({ email });
    if (validUser)
      return next(customErrorHandler(404, "User Already Exists!!!"));
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(customErrorHandler(404, "User not Found!!!"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(customErrorHandler(401, "Invalid Credentials!!!"));
    const { password: pass, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(201)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
