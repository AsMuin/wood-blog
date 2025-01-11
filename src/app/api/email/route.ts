import Email from '@/lib/models/EmailModel';
import apiResponse from '@/utils/response';
import pageQuery from '@/utils/pageQuery';
import connectToMongoDB from '@/lib/config/mongodb';

export async function POST(request: Request) {
    try {
        await connectToMongoDB();
        const { email } = await request.json();
        if (!email) {
            return apiResponse(false, 'email is required');
        }
        const emailExist = await Email.findOne({ email });
        if (emailExist) {
            return apiResponse(false, 'email already exist');
        }
        const newEmail = new Email({ email });
        await newEmail.save();
        return apiResponse(true, 'email saved successfully');
    } catch (error) {
        return apiResponse(false, error instanceof Error ? error.message : 'Email Save Error');
    }
}

export async function GET(request: Request) {
    try {
        await connectToMongoDB();
        const { pageIndex = 0, pageSize = 10 } = Object.fromEntries(new URL(request.url).searchParams);
        const emailPageQuery = pageQuery(Email);
        const response = await emailPageQuery(pageIndex, pageSize);
        return apiResponse(true, 'get Email Success', {
            data: response
        });
    } catch (error) {
        return apiResponse(false, error instanceof Error ? error.message : 'Get Email Error');
    }
}

export async function DELETE(request: Request) {
    try {
        await connectToMongoDB();
        const { id } = await request.json();
        if (!id) {
            return apiResponse(false, 'id is required');
        }
        const selectedEmail = await Email.findByIdAndDelete(id);
        if (!selectedEmail) {
            return apiResponse(false, 'email not found');
        }
        return apiResponse(true, '成功删除');
    } catch (error) {
        console.error(error);
        return apiResponse(false, error instanceof Error ? error.message : 'Email Delete Error');
    }
}
