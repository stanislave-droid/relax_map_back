import getLocations from './locations/get-locations.js';
import { getRegions } from './categories/getRegions.js';
import { registerUser } from './auth/register.js';
import { loginUser } from './auth/login.js';
import { refreshAuthSession } from './auth/refresh.js';
import { logout } from './auth/logout.js';

export const authControllers = {
  registerUser,
  loginUser,
  refreshAuthSession,
  logout,
};

export const categoriesControllers = {
  getRegions,
};

export const usersControllers = {};

export const feedbacksControllers = {};

export const locationsControllers = {
  getLocations,
};
