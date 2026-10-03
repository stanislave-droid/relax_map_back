import {
  loginUserSchema,
  registerUserSchema,
  updateUserSchema,
} from './auth.js';
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
  updateUserSchema,
  getLocationsSchema,
  getFeedbackSchema,
  getAllFeedbackSchema,
  createFeedbackSchema,
  updateLocationSchema,
  createLocationSchema,
  getLocationByIdSchema,
};
