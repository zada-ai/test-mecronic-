/** @type {import('next').NextConfig} */
const nextConfig = {
  // Base path for production deployment behind nginx proxy
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',

  // Asset prefix for static assets
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  // temporarily allow builds to succeed even if ESLint reports issues
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
