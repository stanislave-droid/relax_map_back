import { Router } from 'express';
import { usersControllers as ctrl } from '../controllers/index.js';
import {authenticate} from '../middleware/authenticate.js';
import { getUserByIdController, getUserLocations } from '../controllers/users/usersController.js';

const usersRouter = new Router();

usersRouter.get('/:userId', getUserByIdController);
usersRouter.get('/:userId/locations', getUserLocations);

export default usersRouter;
