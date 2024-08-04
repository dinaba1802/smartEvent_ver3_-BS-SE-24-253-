import mongoose from "mongoose";
import { EVENT_KIND } from "../utils/constants.js";
const EventSchema = new mongoose.Schema(
  {
    event_name: String,
    event_type: String,
    eventKind: {
      type: String,
      enum: Object.values(EVENT_KIND),
      default: EVENT_KIND.WEDDING,
    },
    eventLocation: {
      type: String,
      default: "my city..",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    image: {
      type: String, // Store the image as a Base64 string
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", EventSchema);
