import "express-async-errors";

import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
//routers
import businessRouter from "./routes/businessRouter.js";
import path from "path";
import multer from "multer";

import authRouter from "./routes/authRouter.js";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import { body, param, validationResult } from "express-validator";

//temp

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, origin); // Reflect the request origin
  },
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));
//log the info about our request
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());

app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/v3/businesses", businessRouter);
app.use("/api/v3/auth", authRouter);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

app.post("/api/v3/upload", upload.array("files", 10), (req, res) => {
  // Adjust the second argument to set the maximum number of files
  if (!req.files || req.files.length === 0) {
    return res.status(400).send({ error: "No files uploaded" });
  }

  const fileUrls = req.files.map((file) => {
    return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  });

  res.send({ urls: fileUrls });
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

//access dot env var
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
