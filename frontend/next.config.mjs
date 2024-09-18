/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/auth",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
