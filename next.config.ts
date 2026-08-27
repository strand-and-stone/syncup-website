import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      /**
       * Backup www → apex redirect.
       *
       * Note: On Vercel, domain-layer redirects can override app config unless
       * `www.syncupalarm.com` is added as a project domain with a 308 redirect.
       */
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.syncupalarm.com" }],
        destination: "https://syncupalarm.com/:path*",
        permanent: true, // 308
      },
    ];
  },
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
