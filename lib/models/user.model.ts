import { Document } from 'mongoose';

export interface UserModel {
    id?: any
    name: string;
    email: string;
    role: string;
    img: string;
    password: string;
    phone: string;
}

export interface UserMongoose extends Document {
    _id: any
    name: string;
    email: string;
    role: string;
    img: string;
    password: string;
    phone: string;
}
