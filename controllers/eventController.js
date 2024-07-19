import { nanoid } from 'nanoid';

  let events = [
    { id: nanoid(), event_name: 'Amit', event_type: 'Wedding Hall' },
    { id: nanoid(), event_name: 'Dina', event_type: 'DJ' }
    //    { id: nanoid(), company: 'Apple', position: 'Back-end' },
  ];

export const getAllEvents = async (req, res) => {
    res.status(200).json({ events });
  }

export const createEvent = async (req, res) => {
    const { event_name, event_type } = req.body;
    if (!event_name || !event_type) {
      return res.status(400).json({ msg: 'please provide company and position' });
    }
    const id = nanoid(10);
    const event = { id, event_name, event_type };
    events.push(event);
    res.status(200).json({ event });
  }

export const getEvent = async (req, res) => {
    const { id } = req.params;
    const event = events.find((event) => event.id === id);
    if (!event) {
      throw new Error('no event with that id');
      return res.status(404).json({ msg: `no event with id ${id}` });
    }
    res.status(200).json({ event });
  }

export const updateEvent = async (req, res) => {
    const { event_name, event_type } = req.body;
    if (!event_name || !event_type) {
      return res.status(400).json({ msg: 'please provide event_name and event_type' });
    }
    const { id } = req.params;
    const event = events.find((event) => event.id === id);
    if (!event) {
      return res.status(404).json({ msg: `no event with id ${id}` });
    }
    event.event_name = event_name;
    event.event_type = event_type;
    res.status(200).json({ msg: 'event modified', event });
  }

  export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    const event = events.find((event) => event.id === id);
    if (!event) {
      return res.status(404).json({ msg: `no event with id ${id}` });
    }
    const newEvents = events.filter((event) => event.id !== id);
    events = newEvents;
  
    res.status(200).json({ msg: 'event deleted' });
  }