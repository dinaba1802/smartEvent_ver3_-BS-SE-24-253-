import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
//routers
import eventRouter from './routes/eventRouter.js';
import mongoose from 'mongoose';


  
//log the info about our request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.json());


app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'Data received', data: req.body });
});

app.use('/api/v3/events',eventRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

//access dot env var
const port = process.env.PORT || 5100

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
