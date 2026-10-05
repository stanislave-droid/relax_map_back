import { getCategoryTypes } from '../../services/categories.js';

export const getCategoryTypesController = async (req, res) => {
  const types = await getCategoryTypes();

  res.status(200).json({
    status: 200,
    message: 'Successfully found category types!',
    data: types,
  });
};
