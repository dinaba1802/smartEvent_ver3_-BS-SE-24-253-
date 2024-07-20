import {Router} from 'express'
const router = Router()

import {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../controllers/eventController.js'
import { validateEventInput, validateIdParam } from '../middleware/validationMiddleware.js';

router.route('/').get(getAllEvents).post(validateEventInput, createEvent);
router
.route('/:id')
.get(validateIdParam, getEvent)
.patch(validateEventInput, validateIdParam, updateEvent)
.delete(validateIdParam, deleteEvent);

export default router;
