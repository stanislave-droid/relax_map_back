import { FeedbackModel } from '../../models/feedback.js';

export async function getAllFeedback(req, res) {
  const { page, limit } = req.query;

  const skip = (page - 1) * limit;

  const request = FeedbackModel.find();

  const [totalFeedbacks, feedbacks] = await Promise.all([
    request.clone().countDocuments(),
    request
      .skip(skip)
      .limit(limit)
      .sort({ _id: -1 })
      .sort({ createdAt: -1 })
      .populate('locationId', 'name'),
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
