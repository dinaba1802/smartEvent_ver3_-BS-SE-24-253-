import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customErrors.js';
import { EVENT_KIND } from '../utils/constants.js';
import Event from '../models/eventModel.js'
import mongoose from 'mongoose';

const withValidationErrors = (validateValues) => {
    return [
      validateValues,
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          const errorMessages = errors.array().map((error) => error.msg);
          if (errorMessages[0].startsWith('no job')) {
            throw new NotFoundError(errorMessages);
          }
          throw new BadRequestError(errorMessages);
        }
        next();
      },
    ];
  };
  
  export const validateEventInput = withValidationErrors([
    body('event_name').notEmpty().withMessage('event_name is required'),
    body('event_type').notEmpty().withMessage('event_type is required'),
    body('eventLocation').notEmpty().withMessage('event location is required'),
    body('eventKind')
      .isIn(Object.values(EVENT_KIND))
      .withMessage('invalid status value'),
  ]);


  export const validateIdParam = withValidationErrors([
    param('id').custom(async (value) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new BadRequestError('invalid MongoDB id');
      const event = await Event.findById(value);
      if (!event) throw new NotFoundError(`no event with id : ${value}`);
    }),
  ]);