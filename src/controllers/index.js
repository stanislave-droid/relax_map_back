import getLocations from './locations/get-locations.js';
import { registerUser } from './auth/register.js';
import { loginUser } from './auth/login.js';
import { refreshAuthSession } from './auth/refresh.js';

export const authControllers = {
  registerUser,
  loginUser,
  refreshAuthSession,
};

export const categoriesControllers = {};

export const usersControllers = {};

export const feedbacksControllers = {};

export const locationsControllers = {
  getLocations,
};
