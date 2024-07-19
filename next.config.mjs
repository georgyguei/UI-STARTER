/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
};

export default nextConfig;
