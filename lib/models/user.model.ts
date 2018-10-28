import { Schema, model} from 'mongoose';

export interface UserModel {
    id?: any
    name: string;
    email: string;
    role: string;
    img: string;
    password: string;
}

const UserSchema = new Schema({
    name: String,
    email: String,
    role: String,
    img: String,
    password: String
});

export const User = model('User', UserSchema);
