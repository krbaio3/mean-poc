import * as mongoose from 'mongoose';

export interface UserModel {
    id?: any
    name: string;
    email: string;
    role: string;
    img: string;
    password: string;
}

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    role: String,
    img: String,
    password: String
});

export const User = mongoose.model('User', UserSchema);
