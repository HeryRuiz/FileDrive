/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "https://descriptive-starling-943.convex.cloud",
      },
    ],
  },
};

export default nextConfig;
