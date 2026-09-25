import { Router } from 'express';
import { locationsControllers as ctrl } from '../controllers/index.js';
import {authenticate} from '../middleware/authenticate.js';

const locationsRouter = new Router();

export default locationsRouter;
