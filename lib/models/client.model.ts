import { Schema, model } from 'mongoose'

const ClienteSchema = new Schema({
  name: String,
  lastName: String,
  dni: String,
  address: String,
  phone: String,
})

export const Client = model('Cliente', ClienteSchema)
