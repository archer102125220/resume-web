import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported
} from 'firebase/messaging';

import { POST_registerMessageToken } from '@servicesClient/firebaseAdmin';
import { POST_appErrorLog } from '@/services/appErrorLog';

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

// Initialize Firebase
export async function firebaseClientInit() {
  if (typeof window === 'object') {
    firebaseApp = initializeApp(firebaseConfig);
    firebaseAnalytics = getAnalytics(firebaseApp);
    firebaseDB = getFirestore(firebaseApp);
    await firebaseMessagingInit();
  }

  return { firebaseApp, firebaseAnalytics, firebaseDB };
}

export async function requestPermission() {
  try {
    const isSupport = await isSupported();
    if (isSupport === false) {
      console.log('FCM is not Supported');
      // return true的方式略過詢問匡
      return true;
    }
    console.log('Requesting permission...');

    if (Notification.permission === 'granted') {
      console.log('Notification permission granted.');
      return true;
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      console.log({ permission });
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        return true;
      }
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function firebaseClientMessage(
  messaging,
  callback = payload => console.log('Message received. ', payload)
) {
  onMessage(messaging, callback);
}

export async function getOrRegisterServiceWorker() {
  if (
    'serviceWorker' in navigator &&
    typeof window.navigator.serviceWorker !== 'undefined'
  ) {
    const serviceWorker = await window.navigator.serviceWorker.getRegistration(
      '/'
    );
    if (serviceWorker) return serviceWorker;
    return await window.navigator.serviceWorker.register(
      '/firebase-messaging-sw.js'
    );
  }
  throw new Error('The browser doesn`t support service worker.');
}

export async function firebaseMessagingInit() {
  const UrlFirebaseConfig = new URLSearchParams(firebaseConfig);

  const isSupport = await isSupported();

  if (isSupport === false) console.log('FCM is not Supported');

  if (typeof window === 'object' && isSupport) {
    try {
      const serviceWorkerRegistration = await getOrRegisterServiceWorker();

      const registration = await navigator.serviceWorker.ready;
      console.log({ registration });
      registration.postMessage(`${UrlFirebaseConfig}`);
      if (
        typeof registration.waiting === 'object' &&
        registration.waiting !== null
      ) {
        window.addEventListener('beforeunload', () => {
          registration.postMessage('SKIP_WAITING');
        });
      }
      // await fetch(swUrl);

      firebaseMessaging = getMessaging(firebaseApp, {
        vapidKey: process.env.FIREBASE_VAPID_KEY
      });
      const token = await getToken(firebaseMessaging, {
        serviceWorkerRegistration
      });
      await POST_registerMessageToken({ token, os: 'web' });

      await requestPermission();
      firebaseClientMessage(firebaseMessaging, payload => {
        try {
          // new Notification('測試', {
          //   body: payload.data?.msg,
          //   icon: '/img/favicon/favicon.ico'
          // });

          registration.showNotification(payload.data?.title, {
            body: payload.data?.msg,
            icon: payload.data?.img || '/img/favicon/favicon.ico'
          });
        } catch (error) {
          console.log(error);
          // POST_appErrorLog(error);
          // POST_appErrorLog({ ...error });
          POST_appErrorLog({ error });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  return firebaseMessaging;
}
