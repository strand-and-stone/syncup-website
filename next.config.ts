import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "developer.apple.com",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
