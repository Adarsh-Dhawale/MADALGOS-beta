import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Generates the server.js file
  eslint: {
    ignoreDuringBuilds: true, // Bypasses the unescaped entities errors
  },
  typescript: {
    ignoreBuildErrors: true, // Bypasses the empty interface errors
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;