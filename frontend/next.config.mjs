/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '192.168.100.3',
                port: "3000",
            }
        ]
    }
};

export default nextConfig;
