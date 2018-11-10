import mongoose from 'mongoose';

export const PROVIDER_ENUM = ['PHONENUMBER', 'EMAIL', 'FACEBOOK', 'GOOGLE'];

const UserSchema = new mongoose.Schema(
    {
        info: {
            firstname: { type: String, trim: true, default: '' },
            lastname: { type: String, trim: true, default: '' },
            email: { type: String, trim: true, unique: true },
            phonenumber: { type: String, trim: true, default: '' },
            avatar: { type: String, trim: true, default: 'https://i.imgur.com/9IjsEpy.png' },
        },
        providers: [
            {
                uid: { required: true, trim: true, type: String },
                password: { type: String, trim: true },
                type: { required: true, type: String, enum: PROVIDER_ENUM },
            },
        ],
    },
    { timestamps: true },
);

// UserSchema.index({ email: 1 });

export default mongoose.model('User', UserSchema);
