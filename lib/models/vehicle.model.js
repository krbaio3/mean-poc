import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VehicleSchema = Schema({
  brand: String,
  model: String,
  engine: String,
  fuel: String,
  cylinders: Number
});

export const Vehicle = mongoose.model('vehicle', VehicleSchema);
