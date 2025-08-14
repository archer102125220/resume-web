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
// For Firebase JS SDK v11.10.0 and later, measurementId is optional
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
    // return await window.navigator.serviceWorker.register(
    //   '/firebase-messaging-sw.js'
    // );
    return await window.navigator.serviceWorker.register('/service-worker.js', {
      scope: '/'
    });
  }
  throw new Error('The browser doesn`t support service worker.');
}

// async function setFirebaseServiceWorkerConfig(resolve, reject) {
//   try {
//     const UrlFirebaseConfig = new URLSearchParams(firebaseConfig);
//     const serviceWorkerRegistration = await getOrRegisterServiceWorker();

//     if (typeof serviceWorkerRegistration?.active?.postMessage === 'function') {
//       serviceWorkerRegistration.active.postMessage(`${UrlFirebaseConfig}`);
//       if (typeof resolve === 'function') resolve(serviceWorkerRegistration);
//     } else {
//       setTimeout(() => setFirebaseServiceWorkerConfig(resolve, reject), 100);
//     }

//     return serviceWorkerRegistration;
//   } catch (error) {
//     if (typeof reject === 'function') {
//       reject(error);
//     } else {
//       console.error(error);
//     }
//   }
// }

export async function firebaseMessagingInit() {
  // const UrlFirebaseConfig = new URLSearchParams(firebaseConfig);

  const isSupport = await isSupported();

  if (isSupport === false) console.log('FCM is not Supported');

  if (typeof window === 'object' && isSupport) {
    try {
      const serviceWorkerRegistration = await getOrRegisterServiceWorker();
      // serviceWorkerRegistration.active.postMessage(`${UrlFirebaseConfig}`);
      // const serviceWorkerRegistration = await new Promise(
      //   setFirebaseServiceWorkerConfig
      // );

      if (
        typeof serviceWorkerRegistration.waiting === 'object' &&
        serviceWorkerRegistration.waiting !== null
      ) {
        window.addEventListener('beforeunload', () => {
          serviceWorkerRegistration.active.postMessage('SKIP_WAITING');
        });
      }
      // await fetch(swUrl);

      firebaseMessaging = getMessaging(firebaseApp, {
        vapidKey: process.env.FIREBASE_VAPID_KEY
      });
      const token = await getToken(firebaseMessaging, {
        vapidKey: process.env.FIREBASE_VAPID_KEY,
        serviceWorkerRegistration
      });
      await POST_registerMessageToken({ token, os: 'web' });

      await requestPermission();
      /*
        interface MessagePayload {
          readonly collapseKey: string; // 僅限 FCM 訊息才有
          readonly from: string;       // 訊息的發送者
          readonly messageId: string;  // 訊息的唯一 ID
          readonly messageType: string; // "push" 或 "data"

          readonly data?: { [key: string]: string }; // 如果有資料訊息，則包含此屬性

          readonly notification?: NotificationPayload; // 如果有通知訊息，則包含此屬性

          readonly rawData: object; // 原始訊息數據，可能包含更多低級別屬性
        }

        interface NotificationPayload {
          readonly title: string | undefined;
          readonly body: string | undefined;
          readonly image: string | undefined; // 如果設定了通知圖片
          // 還有其他可能的標準通知屬性，例如 icon, badge, click_action, tag, etc.
          // 這些屬性通常在 `notification` 物件內部，或者作為 `data` 的一部分，視如何發送而定
        }
      */
      firebaseClientMessage(firebaseMessaging, payload => {
        try {
          // new Notification('測試', {
          //   body: payload.data?.msg,
          //   icon: '/img/favicon/favicon.ico'
          // });

          const notificationTitle =
            payload?.data?.title || payload?.notification?.title || '';
          const notificationBody =
            payload?.data?.msg || payload?.notification?.body || '';
          const notificationIcon =
            payload?.data?.img || payload?.notification?.image || '';

          serviceWorkerRegistration.showNotification(notificationTitle, {
            body: notificationBody,
            icon: notificationIcon || '/img/favicon/favicon.ico'
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
