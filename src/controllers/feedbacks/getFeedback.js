import { FeedbackModel } from '../../models/feedback.js';
import { LocationModel } from '../../models/location.js';
import createHttpError from 'http-errors';

export async function getFeedback(req, res) {
  const { locationId } = req.params;
  const { page, limit } = req.query;

  const location = await LocationModel.findById(locationId);
  if (!location) {
    throw createHttpError(404, 'Location not found');
  }

  const skip = (page - 1) * limit;

  const request = FeedbackModel.find({ _id: {$in: location.feedbacksId} });

  const [totalFeedbacks, feedbacks] = await Promise.all([
    request.clone().countDocuments(),
    request
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
  ]);

  const totalPages = Math.ceil(totalFeedbacks / limit);

  res.status(200).json({
    page,
    limit,
    totalFeedbacks,
    totalPages,
    feedbacks,
  });
}
