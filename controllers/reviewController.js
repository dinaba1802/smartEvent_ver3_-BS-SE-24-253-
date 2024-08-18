import Review from "../models/reviewModel.js";
import UserModel from "../models/UserModel.js";

const createReview = async (req, res) => {
  try {
    const reviewerId = req.user.userId;

    const { review, rating, business } = req.body;

    let newReview = await Review.create({
      reviewer: reviewerId,
      business,
      rating,
      review,
    });

    const updateResponse = await UserModel.updateOne(
      { _id: business },
      { $push: { reviews: newReview } }
    );

    newReview = await Review.findbyId(newReview._id)
      .populate("reviewer")
      .populate("business");

    return res.json({
      status: 201,
      message: "Review created..",
      data: newReview,
    });
  } catch (e) {
    return res.json({
      status: 400,
      error: e,
    });
  }
};

export { createReview };
