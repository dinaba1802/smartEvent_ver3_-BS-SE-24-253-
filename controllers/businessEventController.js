import BusinessEvent from "../models/businessEvent.js";
import UserModel from "../models/UserModel.js";

export const changeBusinessEventStatus = async (req, res) => {
  try {
    const businessID = req.user.userId;
    const status = req.body.status;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(401).json({
        data: null,
        message: "Status invalid",
        status: 400,
      });
    }

    let business = await UserModel.findById(businessID);
    let businessEvent = await BusinessEvent.findById(
      req.body.businessEvent
    ).populate("customer");

    if (businessEvent.business.toString() !== businessID.toString()) {
      return res.status(401).json({
        data: null,
        message: "Cannot alter event that is not yours",
        status: 401,
      });
    }
    businessEvent.status = status;
    if (status === "approved") {
      business.businessInformation.availableDates =
        business.businessInformation.availableDates.filter(
          (d) =>
            !(
              d.getDate() === businessEvent.date.getDate() &&
              d.getMonth() === businessEvent.date.getMonth() &&
              d.getFullYear() === businessEvent.date.getFullYear()
            )
        );
      await business.save();
    }
    businessEvent = await businessEvent.save();
    return res.status(200).json({
      data: businessEvent,
      message: "Updated status",
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      data: null,
      message: e.message,
      status: 500,
    });
  }
};

export const scheduleBusinessEvent = async (req, res) => {
  try {
    const { businessId, date } = req.body;

    const dateAsDate = new Date(date);

    const business = await UserModel.findById(businessId);
    let currentUser = await UserModel.findById(req.user.userId).populate(
      "businessEventRequests"
    );
    for (var request of currentUser.businessEventRequests ?? []) {
      if (request.business === business && request.date === dateAsDate) {
        return res.status(400).json({
          data: null,
          message:
            "Cannot schedule same event at same date twice with this business",
          status: 400,
        });
      }
    }
    const scheduleRequest = await BusinessEvent.create({
      business: business._id,
      customer: req.user.userId,
      date: dateAsDate,
    });
    business.businessInformation.businessEvents.push(scheduleRequest._id);
    currentUser.businessEventRequests.push(scheduleRequest._id);
    currentUser = await currentUser.save();
    await business.save();
    return res.status(201).json({
      data: currentUser,
      message: "Schedule request sent",
      status: 201,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      data: null,
      message: e.message,
      status: 500,
    });
  }
};
