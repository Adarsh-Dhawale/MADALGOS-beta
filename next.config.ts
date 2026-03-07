import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Enable Standalone Mode
  // This bundles only the necessary files for production into a single folder.
  output: 'standalone',

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
};

export default nextConfig;