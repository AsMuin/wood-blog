import uploadFile from '@/lib/config/cloudFlare';
import connectToMongoDB from '@/lib/config/mongodb';
import Blog from '@/lib/models/BlogModel';
import pageQuery from '@/utils/pageQuery';
import apiResponse from '@/utils/response';

export async function GET(request: Request) {
    try {
        await connectToMongoDB();
        const { pageIndex = 0, pageSize = 10, category, id } = Object.fromEntries(new URL(request.url).searchParams);

        if (id) {
            const selectBlog = await Blog.findById(id);
            return apiResponse(true, 'get Blog Success', {
                data: selectBlog
            });
        }

        const blogPageQuery = pageQuery(Blog);

        const response = await blogPageQuery(pageIndex, pageSize, {
            category: category === 'All' ? undefined : category
        });

        return apiResponse(true, 'get Blog Success', {
            data: response
        });
    } catch (error) {
        return apiResponse(false, error instanceof Error ? error.message : 'Blog Get Error');
    }
}

export async function POST(request: Request) {
    try {
        await connectToMongoDB();
        const formData = await request.formData();
        const timestamp = Date.now();
        const image = formData.get('image') as File;
        const title = formData.get('title');
        const description = formData.get('description');
        const category = formData.get('category');
        const author = formData.get('author');
        //TODO
        const authorImage = formData.get('authorImage') || 'https://cloud.asmuin.top/woodBlog/1736008934236-233.jpg';

        if (!title || !description || !category || !author) {
            return apiResponse(false, 'some data is missing');
        }
        if (!image || typeof image === 'string') {
            return apiResponse(false, 'Image is required and must be a file');
        }

        const imageBuffer = Buffer.from(await image.arrayBuffer());
        const imageUrl = await uploadFile(imageBuffer, `${timestamp}-${image.name}`);
        if (!imageUrl) {
            return apiResponse(false, 'Image upload failed');
        }
        console.log(imageUrl);
        const blogData = {
            title,
            description,
            category,
            author,
            image: imageUrl,
            authorImage
        };
        const newBlog = new Blog(blogData);
        await newBlog.save();
        return apiResponse(true, 'add Blog Success', {
            data: {
                ...blogData
            }
        });
    } catch (error) {
        console.error(error);
        return apiResponse(false, error instanceof Error ? error.message : 'Blog Post Error');
    }
}

export async function DELETE(request: Request) {
    try {
        await connectToMongoDB();
        const { id } = await request.json();
        if (!id) {
            return apiResponse(false, 'id is required');
        }
        try {
            await Blog.findByIdAndDelete(id);
            return apiResponse(true, 'delete Blog Success');
        } catch (error) {
            console.error(error);
            return apiResponse(false, error instanceof Error ? error.message : 'Blog Delete Error');
        }
    } catch (error) {
        console.error(error);
        return apiResponse(false, error instanceof Error ? error.message : 'Blog Delete Error');
    }
}
