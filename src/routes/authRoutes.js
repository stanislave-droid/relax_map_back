import { Router } from 'express';
import { authControllers as ctrl } from '../controllers/index.js';
import { celebrate } from 'celebrate';
import { validations } from '../validations/index.js';

const authRouter = Router();

authRouter.post(
  '/register',
  celebrate(validations.registerUserSchema, { abortEarly: false }),
  ctrl.registerUser,
);

authRouter.post(
  '/login',
  celebrate(validations.loginUserSchema, { abortEarly: false }),
  ctrl.loginUser,
);

authRouter.post('/refresh', ctrl.refreshAuthSession);

export default authRouter;
