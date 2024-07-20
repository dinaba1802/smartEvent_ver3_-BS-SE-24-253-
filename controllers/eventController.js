import { nanoid } from 'nanoid';
import Event from '../models/eventModel.js';
import { StatusCodes } from 'http-status-codes';
import {NotFoundError} from '../errors/customErrors.js';

  let events = [
    { id: nanoid(), event_name: 'Amit', event_type: 'Wedding Hall' },
    { id: nanoid(), event_name: 'Dina', event_type: 'DJ' }
    //    { id: nanoid(), company: 'Apple', position: 'Back-end' },
  ];

export const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(StatusCodes.OK).json({ events });
};

export const createEvent = async (req, res) => {
    const event = await Event.create( req.body );
    res.status(StatusCodes.CREATED).json({ event });
  }

export const getEvent = async (req, res) => {
  const { id } = req.params;
  const event = await Event.findById(id);
  if (!event) throw new NotFoundError(`no event with id ${id}`); 
  res.status(StatusCodes.OK).json({ event });
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedEvent) throw new NotFoundError(`no event with id ${id}`); 
  res.status(StatusCodes.OK).json({ msg: 'event modified', event: updatedEvent });
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const removedEvent = await Event.findByIdAndDelete(id);
  if (!removedEvent) throw new NotFoundError(`no event with id ${id}`); 
  res.status(StatusCodes.OK).json({ msg: 'event deleted', event: removedEvent });
};