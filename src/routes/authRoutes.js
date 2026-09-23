import { Router } from 'express';
import { authControllers as ctrl } from '../controllers/index.js';

const authRouter = new Router();

authRouter.get('/register', ctrl.register);

export default authRouter;
