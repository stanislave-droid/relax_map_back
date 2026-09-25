import { Router } from 'express';
import { categoriesControllers as ctrl } from '../controllers/index.js';

const categoriesRouter = new Router();

categoriesRouter.get('/types', ctrl.getCategoryTypesController);

export default categoriesRouter;
