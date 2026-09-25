import { Segments, Joi } from 'celebrate';
import { idValidation } from '../utils/mongooseUtils.js';
import {
  LOCATIONS_SORT_BY,
  LOCATIONS_SORT_DIRECTION,
} from '../constants/locationsSortBy.js';

export const getLocationsSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().default(1).min(1),
    limit: Joi.number().integer().default(10).min(5).max(20),
    region: Joi.string().custom(idValidation),
    type: Joi.string().custom(idValidation),
    search: Joi.string().max(96).allow(''),
    sortBy: Joi.string().valid(...LOCATIONS_SORT_BY),
    sortDirection: Joi.string().valid(...LOCATIONS_SORT_DIRECTION),
  }),
};

export const updateLocationSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(idValidation).required(),
  }),
  [Segments.BODY]: Joi.object({
    name: Joi.string().trim().min(3).max(96),
    description: Joi.string().trim().min(20).max(6000),
    locationType: Joi.string().max(64),
    region: Joi.string().max(64),
    rate: Joi.number().min(0).max(5),
    coordinates: Joi.object({
      lat: Joi.number().min(-90).max(90),
      lon: Joi.number().min(-180).max(180),
    })
  }).min(1),
};
