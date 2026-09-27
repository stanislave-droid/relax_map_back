import createHttpError from 'http-errors';
import { FeedbackModel } from '../../models/feedback.js';
import { LocationModel } from '../../models/location.js';

export async function createFeedback(req, res) {
  const { locationId } = req.params;
  const { rate, description } = req.body;
  const userId = req.user._id;
  console.log(userId);

  const location = await LocationModel.findById(locationId);
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const feedback = await FeedbackModel.create({
    userName: req.user.name,
    ownerId: userId,
    rate,
    description,
  });

  await LocationModel.findByIdAndUpdate(locationId, {
    $addToSet: { feedbacksId: feedback._id },
  });

  res.status(201).json({
    message: 'Feedback created successfully',
  });
}
