import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { createJWT } from "../utils/tokenUtils.js";
import dotenv from "dotenv";

dotenv.config();
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount
    ? "admin"
    : req.body.business
    ? "business"
    : "user";
  delete req.body.business;

  const existingAccount = await User.findOne({ email: req.body.email });

  if (existingAccount) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      data: null,
      status: StatusCodes.BAD_REQUEST,
      message: "User with email already exists",
    });
  }
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create({
    ...req.body,
    createdAt: new Date(),
  });
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate("businessEventRequests")
      .populate({
        path: "businessInformation.businessEvents",
        populate: {
          path: "customer",
        },
      });
    res.status(200).json({
      data: user,
      status: StatusCodes.OK,
      message: "User credentials fetched",
    });
  } catch (e) {
    res.status(400).json({
      data: null,
      stauts: StatusCodes.BAD_REQUEST,
      message: "Auhtentication failed",
    });
  }
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError("invalid credencials");
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  res.status(StatusCodes.OK).json(token);
};
/*res.status(StatusCodes.CREATED).json({
  status: 200,
  data: token,
  message: "Login sucessfull",
});*/

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};

export const getBusiness = async (req, res) => {
  try {
    const bid = req.params.bid;
    const business = await User.findById(bid);
    res.status(StatusCodes.OK).json({
      message: "business fetched",
      data: business,
      status: StatusCodes.OK,
    });
  } catch (e) {
    res.status(StatusCodes.NOT_FOUND).json({
      message: "business not found",
      data: null,
      status: StatusCodes.NOT_FOUND,
    });
  }
};

export const updateBusinessInformation = async (req, res) => {
  try {
    const userId = req.user.userId;
    const result = await User.updateOne(
      { _id: userId },
      { businessInformation: req.body }
    );
    const user = await User.findById(req.user.userId)
      .populate("businessEventRequests")
      .populate({
        path: "businessInformation.businessEvents",
        populate: {
          path: "customer",
        },
      });
    return res.status(201).json({
      data: user,
      stauts: StatusCodes.CREATED,
      message: "Business information updated",
    });
  } catch (e) {
    res.status(400).json({
      data: null,
      stauts: StatusCodes.BAD_REQUEST,
      message: "Auhtentication failed",
    });
  }
};
