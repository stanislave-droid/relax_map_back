import { Router } from 'express';
import { getUserByIdController } from '../controllers/users/usersController.js';

const usersRouter = new Router();

usersRouter.get('/:userId', getUserByIdController);

export default usersRouter;
