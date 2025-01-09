'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                <div className="text-center">
                    <h2 className="mb-4 text-3xl font-bold text-red-600">页面出现了问题!</h2>
                    <p className="mb-2 text-gray-600">我们已经收到错误报告，我们将尽快解决问题。</p>
                    <p className="mb-6 text-sm text-gray-500">Error: {error.message || 'An unexpected error occurred'}</p>
                    <button
                        onClick={() => reset()}
                        className="rounded-md bg-blue-500 px-6 py-2 font-semibold text-white transition-colors duration-200 hover:bg-blue-600">
                        请重试
                    </button>
                </div>
            </div>
        </div>
    );
}
