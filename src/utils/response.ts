import { NextResponse } from 'next/server';
interface IResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}
function apiResponse<T = any>(success: boolean, message: string, returnInfo?: { data: T; token?: string }) {
    const responseBody: IResponse<T> = {
        success,
        message,
        ...(returnInfo?.data && {
            data: returnInfo.data
        }),
        ...(returnInfo?.token && {
            token: returnInfo.token
        })
    };
    return NextResponse.json(responseBody);
}
export default apiResponse;
