import { Router } from 'express';
import { authControllers as ctrl } from '../controllers/index.js';
import { refreshAuthSession } from '@/controllers/auth/refresh.js';

const authRouter = new Router();

authRouter.get('/register', ctrl.register);
authRouter.post('/refresh', refreshAuthSession);

export default authRouter;
