/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "api-junior-challenge.vercel.app",
            },
            {
                protocol: "https",
                hostname: "8a9h7ksxgpo1iyir.public.blob.vercel-storage.com"
            }
        ]
    }
};

export default nextConfig;
