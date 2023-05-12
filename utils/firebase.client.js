import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import { POST_registerMessageToken } from '@serverClient/firebaseAdmin';

// https://firebase.google.com/docs/cloud-messaging/js/receive?hl=zh-cn#web-version-9_2

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

export async function requestPermission() {
  if (typeof window !== 'object') return;
  console.log('Requesting permission...');
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted.');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function firebaseClientMessage(
  messaging,
  callback = payload => console.log('Message received. ', payload)
) {
  onMessage(messaging, callback);
}

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

    await requestPermission();
    firebaseClientMessage(firebaseMessaging);
  }

  return { firebaseApp, firebaseAnalytics, firebaseDB };
}
