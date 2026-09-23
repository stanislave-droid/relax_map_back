import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema({});

export const FeedbackModel = model('feedback', FeedbackSchema);
