//import { nanoid } from 'nanoid';
import Event from '../models/eventModel.js';
import { StatusCodes } from 'http-status-codes';

  //let events = [
    //{ id: nanoid(), event_name: 'Amit', event_type: 'Wedding Hall' },
    //{ id: nanoid(), event_name: 'Dina', event_type: 'DJ' }
    //    { id: nanoid(), company: 'Apple', position: 'Back-end' },
 // ];

export const getAllEvents = async (req, res) => {
  const events = await Event.find({createdBy:req.user.userId});
  res.status(StatusCodes.OK).json({ events });
};

export const createEvent = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const event = await Event.create( req.body );
    res.status(StatusCodes.CREATED).json({ event });
  }

export const getEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.status(StatusCodes.OK).json({ event });
};

export const updateEvent = async (req, res) => {
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: 'event modified', event: updatedEvent });
};

export const deleteEvent = async (req, res) => {
  const removedEvent = await Event.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ msg: 'event deleted', event: removedEvent });
};