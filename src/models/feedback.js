import { Schema, model } from 'mongoose';

const FeedbackSchema = new Schema({
  userName: {
    type: String,
    minLength: 2,
    maxLength: 32,
    trim: true,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  rate: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  description: {
    type: String,
    minLength: 1,
    maxLength: 200,
    trim: true,
    required: true,
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
);


export const FeedbackModel = model('feedback', FeedbackSchema);
