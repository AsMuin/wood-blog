import Email from '@/lib/models/EmailModel';
import apiResponse from '@/utils/response';
import mongooseConnect from '@/lib/config/mongodb';
mongooseConnect();
export async function POST(request: Request) {
    try {
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
