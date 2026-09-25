import { Schema, model, ObjectId } from 'mongoose';

const LocationSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 96,
      trim: true,
    },
    description: {
      type: String,
      minLength: 20,
      maxLength: 6000,
      required: true,
      trim: true,
    },
    locationType: {
      type: String,
      maxLength: 64,
      required: true,
      trim: true,
    },
    region: {
      type: String,
      maxLength: 64,
      required: true,
      trim: true,
    },
    rate: {
      type: Number,
      min: 0,
      max: 5,
    },
    ownerId: {
      type: ObjectId,
      ref: 'User',
      required: true,
    },
    feedbacksId: {
      type: [ObjectId],
      default: [],
    },
    coordinates: {
      lat: { type: Number, default: 0 },
      lon: { type: Number, default: 0 },
    },
  },
  { timestamps: true, versionKey: false },
);

LocationSchema.index({ region: 1 });
LocationSchema.index({ category: 1 });

export const LocationModel = model('location', LocationSchema);
