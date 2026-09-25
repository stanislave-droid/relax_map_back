import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {
  getUserByIdController,
  getCurrentUserController,
} from '../controllers/users/usersController.js';

const usersRouter = new Router();

usersRouter.get('/current', authenticate, getCurrentUserController);
usersRouter.get('/:userId', getUserByIdController);

export default usersRouter;
