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
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
