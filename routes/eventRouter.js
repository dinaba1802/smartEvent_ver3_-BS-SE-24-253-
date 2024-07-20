import {Router} from 'express'
const router = Router()

import {
    getAllEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent,
} from '../controllers/eventController.js'

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

export default router;
