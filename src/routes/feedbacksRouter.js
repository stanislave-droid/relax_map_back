import { Router } from 'express';
import { feedbacksControllers as ctrl } from '../controllers/index.js';
import {authenticate} from '../middleware/authenticate.js';
import { celebrate } from 'celebrate';
import { validations } from '../validations/index.js';

const feedbacksRouter = new Router();

feedbacksRouter.get('/:locationId', celebrate(validations.getFeedbackSchema), ctrl.getFeedback)
export default feedbacksRouter;
