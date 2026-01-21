import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
    ],
  },
};

const withNextIntl = require("next-intl/plugin")("./src/lib/i18n/request.ts");

module.exports = withNextIntl(nextConfig);
