import { Router } from 'express';
import { usersControllers as ctrl } from '../controllers/index.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';
import { celebrate } from 'celebrate';
import { validations } from '../validations/index.js';
const usersRouter = new Router();

usersRouter.get('/current', authenticate, ctrl.getCurrentUserController);
usersRouter.get('/:userId', ctrl.getUserByIdController);
usersRouter.get('/:userId/locations', ctrl.getUserLocations);
usersRouter.patch(
  '/me/avatar',
  authenticate,
  upload().single('avatar'),
  celebrate(validations.updateUserSchema, { abortEarly: false }),
  ctrl.updateUserAvatar,
);

export default usersRouter;
