import { Schema, model } from 'mongoose';

// const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
  brand: {
    type: String,
    required: 'The Brand is required'
  },
  model: {
    type: String,
    required: 'The Model is required'
  },
  engine: {
    type: String,
    required: 'The Engine is required'
  },
  fuel: {
    type: String,
    default: 'gas'
  },
  cylinders: {
    type: Number,
    required: '4'
  }
});

export const Vehicle = model('Vehicle', VehicleSchema);
