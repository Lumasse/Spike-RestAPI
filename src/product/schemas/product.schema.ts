import { Schema } from 'mongoose';

export const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  price: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
