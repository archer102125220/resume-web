/** @type {import('next').NextConfig} */
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// const IS_DEV = process.env.NODE_ENV !== 'production';

const isStatic = process.env.STATIC === 'true';

const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NODE_ENV === 'development' ? '.next' : 'build',
  swcMinify: true,
  images: {
    unoptimized: isStatic === true,
    remotePatterns: [
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
    return config;
  },
  headers() {
    const headersList = [];

    // if (IS_DEV !== true) {
    //   headersList.push({
    //     source: '/:path*',
    //     headers: [
    //       {
    //         key: 'Content-Security-Policy',
    //         // prettier-ignore
    //         value: 'default-src \'self\'; script-src \'self\'; style-src \'self\' \'unsafe-inline\'; img-src \'self\' data: https://cdn.aframe.io https://cdn.glitch.com; font-src \'self\'; connect-src \'self\';'
    //       }
    //     ]
    //   });
    // }

    // https://nextjs.org/docs/pages/api-reference/config/next-config-js/headers#permissions-policy
    headersList.push({
      source: '/:path*',
      headers: [
        {
          key: 'Permissions-Policy',
          value:
            'accelerometer=(), autoplay=(), camera=(), fullscreen=(), geolocation=(), microphone=()'
        }
      ]
    });

    headersList.push(
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
    );

    return headersList;
  },
  env: {
    STATIC: isStatic,
    AXIOS_BASE_URL: '/api',
    IS_DEV: process.env.NODE_ENV === 'development',
  }
};

export default nextConfig;
