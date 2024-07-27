import { Router } from "express";
import { register, login, me } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
import { validateLoginInput } from "../middleware/validationMiddleware.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.get("/me", authenticateUser, me);
router.post("/login", validateLoginInput, login);

export default router;
