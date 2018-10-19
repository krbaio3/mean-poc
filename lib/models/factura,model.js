import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const BillSchema = Schema({
    numBill: String,
    description: String,
    units: Number,
    tax: Number,
    amount: Number,
    vehicle: { type: Schema.Types.ObjectId, ref:'Vehicles'},
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner'}
});

export const Bill = mongoose.model('Bill', BillSchema);
