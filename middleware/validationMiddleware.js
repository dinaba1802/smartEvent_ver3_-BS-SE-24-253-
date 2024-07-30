import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/customErrors.js';
import { EVENT_KIND } from '../utils/constants.js';
import Event from '../models/eventModel.js'
import User from '../models/UserModel.js';
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
          if(errorMessages[0].startsWith('not authorized')){
            throw new UnauthenticatedError('not authorized to access this route')

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
      const isAdmin = req.user.role === 'admin'
      const isOwner = req.user.userId === JsonWebTokenError.createBy.toString()
      if(isAdmin && isOwner) 
        throw new UnauthenticatedError('not authorized to access this route')
    }),
  ]);


  export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('name is required'),
    body('email')
      .notEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('invalid email format')
      .custom(async (email) => {
        const user = await User.findOne({ email });
        if (user) {
          throw new BadRequestError('email already exists');
        }
      }),
    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({ min: 8 })
      .withMessage('password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('last name is required'),
  ]);


export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format'),
  body('password').notEmpty().withMessage('password is required'),
]);
