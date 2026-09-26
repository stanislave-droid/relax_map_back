import { Router } from 'express';
import { usersControllers as ctrl } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';

const usersRouter = new Router();

usersRouter.get('/current', authenticate, ctrl.getCurrentUserController);
usersRouter.get('/:userId', ctrl.getUserByIdController);
usersRouter.get('/:userId/locations', ctrl.getUserLocations);

export default usersRouter;
