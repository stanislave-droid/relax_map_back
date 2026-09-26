import { loginUserSchema, registerUserSchema } from './auth.js';
import { getLocationsSchema, updateLocationSchema } from './location.js';
import { getFeedbackSchema } from './feedback.js';

export const validations = {
  registerUserSchema,
  loginUserSchema,
  getLocationsSchema,
  getFeedbackSchema,
  updateLocationSchema,
};
