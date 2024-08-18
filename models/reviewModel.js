import mongoose from "mongoose";

const ReviewScheme = mongoose.Schema({
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  review: { type: String, required: true },
  rating: { type: Number, require: true, default: 5 }, // 1-5
});

const Review = mongoose.model("reviews", ReviewScheme);

export default Review;
