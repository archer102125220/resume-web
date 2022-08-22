/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
  env: {
    AXIOS_BASE_URL: process.env.NODE_ENV === 'development'?'http://localhost:3000/api' : '',
    NODE_ENV: process.env.NODE_ENV || 'development'
  },
};

module.exports = nextConfig;
