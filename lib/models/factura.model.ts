import { Schema, model } from 'mongoose';

const BillSchema = new Schema({
    numBill: String,
    description: String,
    units: Number,
    tax: Number,
    amount: Number,
    vehicle: { type: Schema.Types.ObjectId, ref:'Vehicles'},
    client: { type: Schema.Types.ObjectId, ref: 'Client' },
    owner: { type: Schema.Types.ObjectId, ref: 'Owner'}
});

export const Bill = model('Bill', BillSchema);
