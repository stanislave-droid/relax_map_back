import createHttpError from 'http-errors';
export const createLocationController = async (req, res) => {
  const { name, type, region, description } = req.body;
  const { file, user } = req;
  if (!req.file) {
    throw createHttpError(400, 'Image is required');
  }
  const id = user._id;
};
