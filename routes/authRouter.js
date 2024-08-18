import { Router } from "express";
import {
  register,
  login,
  logout,
  me,
  updateBusinessInformation,
  getBusiness,
} from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
import { validateLoginInput } from "../middleware/validationMiddleware.js";
import {
  authenticateBusinessUser,
  authenticateUser,
} from "../middleware/authMiddleware.js";
//import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/get-business/:bid", getBusiness);
router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.get("/me", authenticateUser, me);

router.put(
  "/update-business",
  authenticateUser,
  authenticateBusinessUser,
  updateBusinessInformation
);

router.post("/logout", logout);

export default router;
