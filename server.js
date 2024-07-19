import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

  let events = [
    { id: nanoid(), event_name: 'Amit', event_type: 'Wedding Hall' },
    { id: nanoid(), event_name: 'Dina', event_type: 'DJ' }
    //    { id: nanoid(), company: 'Apple', position: 'Back-end' },
  ];
  
//log the info about our request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.json());



app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body });
});

//Get all events
app.get('/api/v3/events', (req, res) => {
  res.status(200).json({ events });
});

//Create event
app.post('/api/v3/events', (req, res) => {
  const { event_name, event_type } = req.body;
  if (!event_name || !event_type) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }
  const id = nanoid(10);
  const event = { id, event_name, event_type };
  events.push(event);
  res.status(200).json({ event });
});


// GET SINGLE JOB
app.get('/api/v3/events/:id', (req, res) => {
  const { id } = req.params;
  const event = events.find((event) => event.id === id);
  if (!event) {
    throw new Error('no event with that id');
    return res.status(404).json({ msg: `no event with id ${id}` });
  }
  res.status(200).json({ event });
});


// EDIT JOB
app.patch('/api/v3/events/:id', (req, res) => {
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
});

// DELETE JOB
app.delete('/api/v3/events/:id', (req, res) => {
  const { id } = req.params;
  const event = events.find((event) => event.id === id);
  if (!event) {
    return res.status(404).json({ msg: `no event with id ${id}` });
  }
  const newEvents = events.filter((event) => event.id !== id);
  events = newEvents;

  res.status(200).json({ msg: 'event deleted' });
});

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

//access dot env var
const port = process.env.PORT || 5100

app.listen(5100, () => {
  console.log(`server running on PORT ${port}...`);
});