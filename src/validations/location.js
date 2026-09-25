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
