/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: process.env.NODE_ENV !== "production" ? "http" : "https",
                hostname: process.env.API_BASE_HOST || "192.168.100.3",
                port: process.env.NODE_ENV !== "production" ? "3000" : undefined,
            }
        ]
    }
};

export default nextConfig;
