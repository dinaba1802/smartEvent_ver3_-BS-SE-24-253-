import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import UserModel from "../models/UserModel.js";
const router = Router();

router.route("/").get(async (req, res) => {
  const businesses = await UserModel.find({ role: "business" }).populate({
    path: "reviews",
    populate: ["reviewer"],
  });
  res.status(StatusCodes.OK).json(businesses);
});
export default router;
