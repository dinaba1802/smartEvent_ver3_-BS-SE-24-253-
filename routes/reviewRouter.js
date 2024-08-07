import express from "express";
import * as reviewController from "../controllers/reviewController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
const router = express.Router();

// route to creare a review
// expects authenticated user
router.post("/createReview", authenticateUser, reviewController.createReview);

export default router;
