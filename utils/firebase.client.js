import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getMessaging, getToken } from 'firebase/messaging';

import { POST_registerMessageToken } from '@serverClient/firebaseAdmin';

// const firebaseAdmin = require('firebase-admin');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'resume-web-bcdbb.firebaseapp.com',
  projectId: 'resume-web-bcdbb',
  storageBucket: 'resume-web-bcdbb.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.GA_ID
};

export let firebaseApp;
export let firebaseAnalytics;
export let firebaseDB;
export let firebaseMessaging;

// Initialize Firebase
export async function firebaseClientInit() {
  if (typeof window === 'object') {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAnalytics = getAnalytics(firebaseApp);
    firebaseDB = getFirestore(firebaseApp);
    firebaseMessaging = getMessaging(firebaseApp);
    try {
      const token = await getToken(firebaseMessaging);
      await POST_registerMessageToken({ token, os: 'web' });
    } catch (error) {
      console.log(error);
    }
  }

  return { firebaseApp, firebaseAnalytics, firebaseDB };
}
