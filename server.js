import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
//routers
import eventRouter from './routes/eventRouter.js';
import mongoose from 'mongoose';
//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';


  
//log the info about our request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.json());


app.post('/api/v3/test', (req, res) => {
  const { name } = req.body;
  res.json({ msg: `hello ${name}` });
});

app.use('/api/v3/events',eventRouter);

app.use(errorHandlerMiddleware);

//access dot env var
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
