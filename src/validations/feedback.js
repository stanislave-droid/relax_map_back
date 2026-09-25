import { Segments, Joi } from 'celebrate';
import { idValidation } from '../utils/mongooseUtils.js';

export const getFeedbackSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(idValidation).required(),
  }),
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(3).max(20).default(3),
  }),
};
