import { loginUserSchema, registerUserSchema } from './auth.js';
import { getLocationsSchema } from './location.js';

export const validations = {
  registerUserSchema,
  loginUserSchema,
  getLocationsSchema,
};
