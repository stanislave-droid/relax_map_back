import { getCategoryTypes } from '../../services/categories.js';

export const getCategoryTypesController = async (req, res) => {
  const types = await getCategoryTypes();

  res.status(200).json(types);
};
