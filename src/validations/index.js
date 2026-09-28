import { loginUserSchema, registerUserSchema } from './auth.js';
import {
  createLocationSchema,
  getLocationByIdSchema,
  getLocationsSchema,
  updateLocationSchema,
} from './location.js';
import {
  createFeedbackSchema,
  getAllFeedbackSchema,
  getFeedbackSchema,
} from './feedback.js';
import createHttpError from 'http-errors';

export const validations = {
  registerUserSchema,
  loginUserSchema,
  getLocationsSchema,
  getFeedbackSchema,
  getAllFeedbackSchema,
  createFeedbackSchema,
  updateLocationSchema,
  createLocationSchema,
  getLocationByIdSchema,
};
