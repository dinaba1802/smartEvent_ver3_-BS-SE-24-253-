import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import { nanoid } from 'nanoid';

  let events = [
    { id: nanoid(), event_name: 'Amit', event_type: 'Wedding Hall' },
    { id: nanoid(), event_name: 'Dina', event_type: 'DJ' },
    { id: nanoid(), event_name: 'Roni', event_type: 'Designer' },
    //    { id: nanoid(), company: 'Apple', position: 'Back-end' },

  ];
  
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



//log the info about our request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};


app.use(express.json());
//app.use(express.urlencoded({ extended: true }));



app.post('/', (req, res) => {
    console.log(req);
  
res.json({ message: 'Data received', data: req.body });
});

//access dot env var
const port = process.env.PORT || 5100

app.listen(5100, () => {
  console.log(`server running on PORT ${port}...`);
});