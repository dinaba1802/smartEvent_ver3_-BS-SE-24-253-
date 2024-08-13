import express from "express";
import { deleteUser, siteStats } from "../controllers/adminController.js";

const router = express.Router();

router.get("/stats", siteStats);
router.post("/delete-user", deleteUser);

export default router;
