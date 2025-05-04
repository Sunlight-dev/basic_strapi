
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapitest-production-f1f1.up.railway.app",
      },
      {
        protocol: "http",
        hostname: "192.168.142.33",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_STRAPI_API_URL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
};

export default nextConfig;
