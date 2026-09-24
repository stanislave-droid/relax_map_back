import { Router } from 'express';
import { locationsControllers as ctrl } from '../controllers/index.js';

const locationsRouter = new Router();

locationsRouter.get('/', ctrl.getLocations);

export default locationsRouter;
