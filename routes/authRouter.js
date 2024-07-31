import { Router } from "express";
import { register, login, logout } from "../controllers/authController.js";
import { validateRegisterInput } from "../middleware/validationMiddleware.js";
import { validateLoginInput } from "../middleware/validationMiddleware.js";
//import { authenticateUser } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.post("/logout", logout);

export default router;
