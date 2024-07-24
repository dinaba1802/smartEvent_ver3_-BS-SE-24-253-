import Review from "../models/reviewModel";

const createReview = async (req, res) => {
  try {
    const reviewerId = req.user.userid;

    const { review, rating, business } = req.body;

    const newReview = await Review.create({
      reviewer: reviewerId,
      business,
      rating,
      review,
    });

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
