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

export const getAllFeedbackSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(3).max(20).default(3),
  }),
};

export const createFeedbackSchema = {
  [Segments.PARAMS]: Joi.object({
    locationId: Joi.string().custom(idValidation).required(),
  }),
  [Segments.BODY]: Joi.object({
    rate: Joi.number().integer().min(1).max(5).required(),
    description: Joi.string().max(500).required(),
  }),
};
