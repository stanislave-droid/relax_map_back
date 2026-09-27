import { Router } from 'express';
import { locationsControllers as ctrl } from '../controllers/index.js';
import { celebrate } from 'celebrate';
import { validations } from '../validations/index.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const locationsRouter = new Router();

locationsRouter.get(
  '/',
  celebrate(validations.getLocationsSchema),
  ctrl.getLocations,
);

locationsRouter.patch(
  '/:locationId',
  authenticate,
  celebrate(validations.updateLocationSchema),
  upload(2, ['image/jpeg', 'image/jpg', 'image/png']).single('image'),
  ctrl.updateLocation,
);
locationsRouter.post(
  '/',
  authenticate,
  celebrate(validations.createLocationSchema),
  upload(1).single('image'),
  ctrl.createLocationController,
);

export default locationsRouter;
