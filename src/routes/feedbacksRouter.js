import { Router } from 'express';
import { feedbacksControllers as ctrl } from '../controllers/index.js';
import {authenticate} from '../middleware/authenticate.js';

const feedbacksRouter = new Router();

export default feedbacksRouter;
