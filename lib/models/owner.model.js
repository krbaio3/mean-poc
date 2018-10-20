import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const OwnerSchema = Schema({
    name: String,
    lastName: String,
    cif: String,
    address: String,
    phone: String
});

export const Owner = mongoose.model('Owner', OwnerSchema);
