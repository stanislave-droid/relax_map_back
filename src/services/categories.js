import { CategoryModel } from '../models/category.js';

export const getCategoryTypes = async () => {
  const categories = await CategoryModel.find({}, 'type slug');

  return categories.map((category) => ({
    id: category._id.toString(),
    name: category.type,
    slug: category.slug,
    iconName: null,
  }));
};
