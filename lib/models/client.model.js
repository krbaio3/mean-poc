import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClienteSchema = Schema({
  name: String,
  lastName: String,
  dni: String,
  address: String,
  phone: String
});

export const Client = mongoose.model('Cliente', ClienteSchema);
