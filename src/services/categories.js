import { CategoryModel } from '../models/category.js';

export const getCategoryTypes = async () => {
  const categories = await CategoryModel.find({}, 'type');

  return categories.map((category) => category.type);
};
