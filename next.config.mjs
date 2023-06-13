/** @type {import('next').NextConfig} */
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const isStatic = process.env.STATIC === 'true';

const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next' : 'build',
  swcMinify: true,
  images: {
    unoptimized: isStatic === true,
    remotePatterns:
      isStatic === false
        ? [
            {
              protocol: 'https',
              hostname: 'cdn.aframe.io',
              port: '',
              pathname: '/examples/ui/**'
            },
            {
              protocol: 'https',
              hostname: 'cdn.glitch.com',
              port: '',
              pathname: '/**'
            }
          ]
        : undefined
  },
  webpack: config => {
    config.resolve.alias['@'] = resolve(__dirname);
    config.resolve.alias['@servicesClient'] = join(
      __dirname,
      'services',
      'client'
    );
    config.resolve.alias['@servicesServices'] = join(
      __dirname,
      'services',
      'server'
    );
    config.resolve.alias['@models'] = join(__dirname, 'models');
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      child_process: false
    };
    return config;
  },
  headers() {
    return [
      {
        source: '/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=utf-8'
          }
        ]
      },
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=utf-8'
          }
        ]
      }
    ];
  },
  env: {
    STATIC: isStatic,
    AXIOS_BASE_URL: '/api',
    IS_DEV: process.env.NODE_ENV === 'development',
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    GA_ID: process.env.GA_ID,
    GTM_ID: process.env.GTM_ID,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    TAPPAY_DOMAIN: process.env.TAPPAY_DOMAIN,
    MERCHANT_ID: process.env.MERCHANT_ID,
    MERCHANT_NAME: process.env.MERCHANT_NAME,
    TAPPAY_APP_ID: Number(process.env.TAPPAY_APP_ID),
    TAPPAY_APP_KEY: process.env.TAPPAY_APP_KEY,
    TAPPAY_PROD: process.env.TAPPAY_PROD === 'true',
    TAPPAY_PARTNER_KEY: process.env.TAPPAY_PARTNER_KEY,
    TAPPAY_FRONTEND_DOMAIN: process.env.TAPPAY_FRONTEND_DOMAIN
  }
};

export default nextConfig;
