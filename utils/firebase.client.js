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

const UrlFirebaseConfig = new URLSearchParams(firebaseConfig);
const swUrl = `/firebase-messaging-sw.js?${UrlFirebaseConfig}`;

export async function getOrRegisterServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    typeof window.navigator.serviceWorker !== 'undefined'
  ) {
    const serviceWorker = await window.navigator.serviceWorker.getRegistration(
      '/'
    );
    if (serviceWorker) return serviceWorker;
    return window.navigator.serviceWorker.register('/firebase-messaging-sw.js');
  }
  throw new Error('The browser doesn`t support service worker.');
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
    try {
      const serviceWorkerRegistration = await getOrRegisterServiceWorker();
      await fetch(swUrl);
      firebaseMessaging = getMessaging(firebaseApp, {
        vapidKey: process.env.FIREBASE_VAPID_KEY
      });
      const token = await getToken(firebaseMessaging, {
        serviceWorkerRegistration
      });
      await POST_registerMessageToken({ token, os: 'web' });
    } catch (error) {
      console.log(error);
    }

    await requestPermission();
    firebaseClientMessage(firebaseMessaging, payload => {
      try {
        new Notification('測試', {
          body: payload.data?.msg,
          icon: '/favicon.ico'
        });
      } catch (error) {
        console.log(error);
        alert(payload.data?.msg);
      }
    });
  }

  return { firebaseApp, firebaseAnalytics, firebaseDB };
}
