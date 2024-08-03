import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: ["user", "admin", "business"],
    default: "user",
  },
  businessInformation: {
    businessName: { type: String, required: false },
    businessAddress: { type: String, required: false },
    businessType: { type: String, required: false },
    businessPhone: { type: String, required: false },
    businessEmail: { type: String, required: false },
    businessAbout: { type: String, required: false },
    businessImages: [{ type: String, required: false }],
  },
  createdAt: { type: Date, required: false },
});

export default mongoose.model("User", UserSchema);
