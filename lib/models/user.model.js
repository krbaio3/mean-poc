import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    email: String,
    role: String,
    img: String,
    password: String
});

export const User = mongoose.model('User', UserSchema);
