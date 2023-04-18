/** @type {import('next').NextConfig} */
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next' : 'build',
  swcMinify: true,
  webpack: config => {
    config.resolve.alias['@'] = resolve(__dirname);
    config.resolve.alias['@serverClient'] = join(
      __dirname,
      'services',
      'client'
    );
    config.resolve.alias['@serverServices'] = join(
      __dirname,
      'services',
      'server'
    );
    return config;
  },
  experimental: {
    headers() {
      return [
        {
          source: '/apple-app-site-association',
          headers: [{ key: 'content-type', value: 'application/json' }]
        },
        {
          source: '/.well-known/apple-app-site-association',
          headers: [{ key: 'content-type', value: 'application/json' }]
        }
      ];
    }
  },
  env: {
    AXIOS_BASE_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/api'
        : '/api',
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    GA_ID: process.env.GA_ID,
    GTM_ID: process.env.GTM_ID,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    TAPPAY_DOMAIN: process.env.TAPPAY_DOMAIN,
    PARTNER_KEY: process.env.PARTNER_KEY,
    MERCHANT_ID: process.env.MERCHANT_ID,
    MERCHANT_NAME: process.env.MERCHANT_NAME
  }
};

export default nextConfig;
