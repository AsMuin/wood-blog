import mongoose from 'mongoose';

export interface IBlog {
    _id: string;
    title: string | FormDataEntryValue;
    description: string | FormDataEntryValue;
    image: string | FormDataEntryValue | FileList;
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

// 使用获取到的类型声明变量
const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
const BlogExport: typeof Blog = mongoose.models.Blog || Blog;

export default BlogExport;
