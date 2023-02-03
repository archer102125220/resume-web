/** @type {import('next').NextConfig} */
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next' : 'build',
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['@'] = resolve(__dirname);
    return config;
  },
  env: {
    AXIOS_BASE_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api',
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    GA_ID: process.env.GA_ID
  },
};

export default nextConfig;
