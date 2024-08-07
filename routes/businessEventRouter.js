import { Router } from "express";
import * as businessEventController from "../controllers/businessEventController.js";
import {
  authenticateBusinessUser,
  authenticateUser,
} from "../middleware/authMiddleware.js";
const router = Router();

router.post(
  "/schedule",
  authenticateUser,
  businessEventController.scheduleBusinessEvent
);
router.post(
  "/update-status",
  authenticateUser,
  authenticateBusinessUser,
  businessEventController.changeBusinessEventStatus
);

export default router;
