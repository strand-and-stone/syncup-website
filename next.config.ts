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
        // File extension is .png; bytes are JPEG (FF D8). The page renders it
        // through the image optimizer, which already sniffs JPEG. This keeps
        // the raw public URL from being labeled image/png.
        source: "/images/hero-app-screenshot.png",
        headers: [{ key: "Content-Type", value: "image/jpeg" }],
      },
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
