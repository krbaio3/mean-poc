import { Schema, model, Model } from 'mongoose';
import { UserMongoose } from 'models';

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: 'The nick is required'
    },
    email: {
        type: String,
        validate: {
            validator: (mail) => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(mail);
            },
            message: props => `${props.value} is not a valid ${props.path}!`,
        },
        required: 'The email is required'
    },
    password: {
        type: String,
        required: 'The password is required'
    },
    phone: {
        type: String,
        validate: {
            validator: (val) => {
                const phoneRegex = /\d{3}-\d{3}-\d{3}/;
                return phoneRegex.test(val);
            },
            message: props => `${props.value} is not a valid ${props.path}phone number!`,
        },
        required: [true, 'User phone number required']
    },
    role: {
        type: String
    },
    img: {
        type: String
    }

});

export const User: Model<UserMongoose> = model<UserMongoose>('User', UserSchema);
