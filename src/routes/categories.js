import { Router } from 'express';
import { categoriesControllers as ctrl } from '../controllers/index.js';

const categoriesRouter = new Router();

<<<<<<< HEAD
categoriesRouter.get('/types', ctrl.getCategoryTypesController);
=======
categoriesRouter.get('/regions', ctrl.getRegions);
>>>>>>> origin/development

export default categoriesRouter;
