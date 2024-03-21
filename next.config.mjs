/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    hostname: "descriptive-starling-943.convex.cloud",
    domains: ["www.gravatar.com"],
    formats: ["image/avif", "image/webp"],
  },
  swcMinify: false,
};

export default nextConfig;
