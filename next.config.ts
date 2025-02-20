import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: isProd ? '/bidwell/' : '',
  basePath: isProd ? '/bidwell' : '',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
