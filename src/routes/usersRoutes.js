import { Router } from 'express';
import { usersControllers as ctrl } from '../controllers/index.js';
import {authenticate} from '../middleware/authenticate.js';

const usersRouter = new Router();



export default usersRouter;
