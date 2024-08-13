import BusinessEvent from "../models/businessEvent.js";
import Review from "../models/reviewModel.js";
import User from "../models/UserModel.js";

const deleteUser = async (req, res) => {
  try {
    const { userEmail } = req.body;

    // Find the user by email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res
        .status(404)
        .json({ error: "User not found", status: 404, data: null });
    }

    const userId = user._id;

    // Delete all BusinessEvents where the user is a business
    await BusinessEvent.deleteMany({ business: userId });

    // Delete all BusinessEvents where the user is a customer
    await BusinessEvent.deleteMany({ customer: userId });

    // Remove the user from all other users' businessEventRequests
    await User.updateMany(
      { businessEventRequests: { $elemMatch: { business: userId } } },
      { $pull: { businessEventRequests: { business: userId } } }
    );

    await User.updateMany(
      { businessEventRequests: { $elemMatch: { customer: userId } } },
      { $pull: { businessEventRequests: { customer: userId } } }
    );
    await Review.deleteMany({ reviewer: userId });

    // Delete all Reviews where the user is a business
    await Review.deleteMany({ business: userId });

    // Finally, delete the user
    await user.deleteOne();

    res.status(200).json({ error: null, status: 200, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message, status: 500, data: null });
  }
};

const siteStats = async (req, res) => {
  try {
    // request status dist

    const cApproved = await BusinessEvent.countDocuments({
      status: "approved",
    });
    const cDenied = await BusinessEvent.countDocuments({ status: "rejected" });
    const cPending = await BusinessEvent.countDocuments({ status: "pending" });

    const statusDist = {
      cApproved,
      cPending,
      cDenied,
    };

    // businesses By Type

    let businesses = await User.find({ role: "business" });
    businesses = businesses.filter((b) => b.businessInformation);

    // grouping
    const businessesByType = businesses.reduce((prev, next) => {
      if (prev[next.businessInformation.businessType]) {
        prev[next.businessInformation.businessType] += 1;
      } else {
        prev[next.businessInformation.businessType] = 1;
      }
      return prev;
    }, {});

    const allUsers_noAdmins = await User.find({ role: { $ne: "admin" } })
      .populate("businessInformation")
      .populate("businessEventRequests");

    return res.status(200).json({
      status: 200,
      error: null,
      data: {
        users: allUsers_noAdmins,
        businessesByType,
        statusDist,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 500,
      error: e.message,
      data: null,
    });
  }
};

export { siteStats, deleteUser };
