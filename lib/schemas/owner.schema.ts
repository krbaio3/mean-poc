import {Schema, model} from 'mongoose';

const OwnerSchema = new Schema({
    name: {
        type: String,
        required: 'The name is required'
    },
    lastName: {
        type: String,
        required: 'The Last Name is required'
    },
    address: {
        type: String,
        required: 'The Address is required'
    },
    zipCode: {
        type: String
        // validar codigo postal
    },
    city: {
        type: String
        // validad ciudad
    },
    idCard: {
        type: String,
        required: 'Obligario el DNI',
        unique: true,
        // validar aquí DNI-CIF-NIE
    },
    telephone: {
        type: String,
        required: 'The telephone is required',
        // validacion telefono, mirar doc de mongoose
    }
});

export const Owner = model('Owner', OwnerSchema);
