import 'express-async-errors';

import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();
import morgan from 'morgan';
import mongoose from 'mongoose';

//routers
import eventRouter from './routes/eventRouter.js';
import authRouter from './routes/authRouter.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import { body, validationResult } from 'express-validator';


//temp


//log the info about our request
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
};

app.use(express.json());


app.use('/api/v3/events', authenticateUser, eventRouter);
app.use('/api/v3/auth', authRouter);


app.use('*', (req, res) => {
  res.status(404).json({msg: 'not found'})
});

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
