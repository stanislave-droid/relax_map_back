import { register } from './auth/register.js';
import getLocations from './locations/get-locations.js';

export const authControllers = {
  register,
};

export const categoriesControllers = {};

export const usersControllers = {};

export const feedbacksControllers = {};

export const locationsControllers = {
  getLocations,
};
