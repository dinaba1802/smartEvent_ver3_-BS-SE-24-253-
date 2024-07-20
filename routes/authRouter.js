import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegisterInput } from '../middleware/validationMiddleware.js';
import { validateLoginInput } from '../middleware/validationMiddleware.js';


const router = Router();

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);


export default router;