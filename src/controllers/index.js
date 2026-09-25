import getLocations from './locations/get-locations.js';
import { getRegions } from './categories/getRegions.js';
import { registerUser } from './auth/register.js';
import { loginUser } from './auth/login.js';
import { refreshAuthSession } from './auth/refresh.js';
import { getCategoryTypesController } from './categories/getTypes.js';

export const authControllers = {
  registerUser,
  loginUser,
  refreshAuthSession,
};

export const categoriesControllers = {
  getCategoryTypesController,
  getRegions,
};

export const usersControllers = {};

export const feedbacksControllers = {};

export const locationsControllers = {
  getLocations,
};
