import { isValidObjectId } from 'mongoose';

export const idValidation = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};
