import { Schema, model } from 'mongoose'

const OwnerSchema = new Schema({
  name: String,
  lastName: String,
  cif: String,
  address: String,
  phone: String,
})

export const Owner = model('Owner', OwnerSchema)
