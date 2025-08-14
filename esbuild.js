const esbuild = require('esbuild');
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const serviceWorkerDir = path.join(__dirname, 'service-worker');
const serviceWorkerFiles = fs
  .readdirSync(serviceWorkerDir)
  .filter(file => file.endsWith('.js'))
  .map(file => path.join(serviceWorkerDir, file));

esbuild
  .build({
    entryPoints: serviceWorkerFiles,
    outfile: path.resolve(__dirname, 'public/service-worker.js'),
    bundle: true,
    minify: true,
    mainFields: ['webworker', 'browser', 'module', 'main', 'default'],
    define: {
      'process.env.IS_DEV': `"${process.env.NODE_ENV === 'development'}"`,
      'process.env.STATIC': `"${process.env.STATIC === 'true'}"`,

      'process.env.AXIOS_BASE_URL': `"${process.env.AXIOS_BASE_URL || '/'}"`,

      'process.env.FIREBASE_API_KEY': `"${process.env.FIREBASE_API_KEY}"`,
      'process.env.ANDROID_FIREBASE_CREDENTIAL':
        process.env.ANDROID_FIREBASE_CREDENTIAL,
      'process.env.FIREBASE_CREDENTIAL': process.env.FIREBASE_CREDENTIAL,
      'process.env.IOS_FIREBASE_CREDENTIAL':
        process.env.IOS_FIREBASE_CREDENTIAL,
      'process.env.MESSAGING_SENDER_ID': `"${process.env.MESSAGING_SENDER_ID}"`,

      'process.env.GA_ID': `"${process.env.GA_ID}"`,
      'process.env.GTM_ID': `"${process.env.GTM_ID}"`,

      'process.env.APP_ID': `"${process.env.APP_ID}"`,
      'process.env.TAPPAY_DOMAIN': `"${process.env.TAPPAY_DOMAIN}"`,
      'process.env.TAPPAY_APP_ID': `"${process.env.TAPPAY_APP_ID}"`,
      'process.env.TAPPAY_APP_KEY': `"${process.env.TAPPAY_APP_KEY}"`,
      'process.env.TAPPAY_PROD': `"${process.env.TAPPAY_PROD === 'true'}"`,
      'process.env.TAPPAY_PARTNER_KEY': `"${process.env.TAPPAY_PARTNER_KEY}"`,
      'process.env.TAPPAY_FRONTEND_DOMAIN': `"${process.env.TAPPAY_FRONTEND_DOMAIN}"`,

      'process.env.MERCHANT_ID': `"${process.env.MERCHANT_ID}"`,
      'process.env.MERCHANT_NAME': `"${process.env.MERCHANT_NAME}"`
    }
  })
  .then(() => console.log('⚡Bundle build complete ⚡'))
  .catch(() => {
    process.exit(1);
  });
