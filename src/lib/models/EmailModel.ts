import mongoose from 'mongoose';

export interface IEmail {
    _id: string;
    email: string;
    date: Date;
}

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const EmailModel = mongoose.model<IEmail>('Email', emailSchema);

const Email: mongoose.Model<IEmail> = mongoose.models.Email || EmailModel;

export default Email;
