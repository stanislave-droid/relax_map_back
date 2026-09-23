import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectMongoDB } from './db/connectToMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './middleware/logger.js';
import { errors } from 'celebrate';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoutes.js';
import categoriesRouter from './routes/categories.js';
import usersRouter from './routes/usersRoutes.js';
import feedbacksRouter from './routes/feedbacksRouter.js';
import locationsRouter from './routes/locationsRouter.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware

app.use(express.json());
app.use(cors());
app.use(logger);
app.use(cookieParser());

// Routes

app.use('/api/auth', authRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/users', usersRouter);
app.use('/api/feedbacks', feedbacksRouter);
app.use('/api/locations', locationsRouter);

// Error handlers

app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

await connectMongoDB();

app.listen(port, () => {
  console.log('Server is running on a port: ' + port);
});
