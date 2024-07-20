import { nanoid } from 'nanoid';
import Event from '../models/eventModel.js';

  let events = [
    { id: nanoid(), event_name: 'Amit', event_type: 'Wedding Hall' },
    { id: nanoid(), event_name: 'Dina', event_type: 'DJ' }
    //    { id: nanoid(), company: 'Apple', position: 'Back-end' },
  ];

export const getAllEvents = async (req, res) => {
  const events = await Event.find({});
  res.status(200).json({ events });
};

export const createEvent = async (req, res) => {
    const event = await Event.create( req.body );
    res.status(201).json({ event });
  }

export const getEvent = async (req, res) => {
    const { id } = req.params;
    const event = await Event.findById(id);
  if (!event) {
    return res.status(404).json({ msg: `no event with id ${id}` });
  }
  res.status(200).json({ event });
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;

  const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedEvent) {
    return res.status(404).json({ msg: `no event with id ${id}` });
  }
  res.status(200).json({ event: updatedEvent });
};

  export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const removedEvent = await Event.findByIdAndDelete(id);

  if (!removedEvent) {
    return res.status(404).json({ msg: `no event with id ${id}` });
  }
  res.status(200).json({ event: removedEvent });
};