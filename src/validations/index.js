import { loginUserSchema, registerUserSchema } from './auth.js';
import { getLocationsSchema } from './location.js';
import { getFeedbackSchema } from './feedback.js';

export const validations = {
  registerUserSchema,
  loginUserSchema,
  getLocationsSchema,
  getFeedbackSchema
};
