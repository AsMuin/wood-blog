import mongoose from 'mongoose';

export interface IBlog {
    title: string | FormDataEntryValue;
    description: string | FormDataEntryValue;
    image: string | FormDataEntryValue;
    category: string | FormDataEntryValue;
    author: string | FormDataEntryValue;
    authorImage: string | FormDataEntryValue;
    date?: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    authorImage: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Blog = mongoose.models.Blog<IBlog> || mongoose.model<IBlog>('Blog', BlogSchema);
export default Blog;
