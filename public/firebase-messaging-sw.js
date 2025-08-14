// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js'
);

// https://medium.com/@sumanthegde123/web-push-notifications-with-react-and-firebase-with-safari-error-handling-d2979d10c9ac
function loadingFirebaseConfig(event) {
  try {
    // const url = event?.request?.url || '';
    // const search = url.substring(url.indexOf('?') + 1);
    // const urlParams = new URLSearchParams(search);
    // const firebaseConfig = Object.fromEntries(urlParams);

    const dataParams = new URLSearchParams(event?.data);
    const firebaseConfig = Object.fromEntries(dataParams);
    if (typeof firebaseConfig.apiKey === 'string') {
      self.firebaseConfig = firebaseConfig;
      firebaseInitializeApp(firebaseConfig);
      // self.removeEventListener('fetch', loadingFirebaseConfig);
      self.removeEventListener('message', loadingFirebaseConfig);
    }
  } catch (err) {
    console.error('Failed to add event listener', err);
  }
}
// self.addEventListener('fetch', loadingFirebaseConfig);
self.addEventListener('message', loadingFirebaseConfig);

function handleSWUpdate(event) {
  if (!event.data) {
    return;
  }

  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting();
  }
}
self.addEventListener('message', handleSWUpdate);

// "Default" Firebase configuration (prevents errors)
const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true
};

function firebaseInitializeApp(firebaseConfig) {
  try {
    // Initialize the Firebase app in the service worker by passing in
    // your app's Firebase config object.
    // https://firebase.google.com/docs/web/setup#config-object
    // Set Firebase configuration, once available
    firebase.initializeApp(
      self.firebaseConfig || firebaseConfig || defaultConfig
    );

    // Retrieve an instance of Firebase Messaging so that it can handle background
    // messages.
    const messaging = firebase.messaging();

    messaging.onBackgroundMessage(payload => {
      console.log(
        '[firebase-messaging-sw.js] Received background message ',
        payload
      );
      // Customize notification here
      // const notificationTitle = 'Background Message Title';
      // const notificationOptions = {
      //   body: 'Background Message body.',
      //   icon: '/firebase-logo.png'
      // };

      // self.registration.showNotification(notificationTitle, notificationOptions);
      if (
        (typeof payload?.data?.title === 'string' &&
          payload?.data?.title !== '') ||
        (typeof payload?.data?.msg === 'string' && payload?.data?.msg !== '') ||
        (typeof payload?.data?.img === 'string' && payload?.data?.img !== '')
      ) {
        self.registration.showNotification(payload.data?.title, {
          body: payload.data?.msg,
          icon: payload.data?.img || '/img/favicon/favicon.ico'
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
