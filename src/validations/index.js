import { loginUserSchema, registerUserSchema } from './auth.js';
import { createLocationSchema } from './location.js';

export const validations = {
  registerUserSchema,
  loginUserSchema,
  createLocationSchema,
};
