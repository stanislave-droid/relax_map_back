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
};

export const usersControllers = {};

export const feedbacksControllers = {};

export const locationsControllers = {};
