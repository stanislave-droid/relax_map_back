import { Joi, Segments } from 'celebrate';
import { emailRegex } from '../constants/emailRegex.js';

export const registerUserSchema = {
  [Segments.BODY]: Joi.object({
    name: Joi.string().min(2).max(32).trim().required(),
    email: Joi.string().pattern(emailRegex).max(64).trim().lowercase().required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};

export const loginUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().pattern(emailRegex).max(64).trim().lowercase().required(),
    password: Joi.string().min(8).max(128).required(),
  }),
};
