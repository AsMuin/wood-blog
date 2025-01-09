import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cloud.asmuin.top'
            }
        ] // Add your domain here
    }
};

export default nextConfig;
