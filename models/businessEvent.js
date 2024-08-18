import mongoose from "mongoose";

const BusinessEventScheme = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  business: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["approved", "rejected", "pending"],
    default: "pending",
  },
});

const BusinessEvent = mongoose.model("business_events", BusinessEventScheme);

export default BusinessEvent;
