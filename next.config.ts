import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Support des images et SVG distants
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Headers CORS pour autoriser l'accès externe à l'API Fumi
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS, PUT, DELETE" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization, x-fumi-api-key, *" },
        ],
      },
    ];
  },
};

export default nextConfig;
