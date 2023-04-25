import firebaseAdmin from 'firebase-admin';

export const credential = process.env.FIREBASE_CREDENTIAL || '{}';

export const firebaseConfig = {
  authDomain: 'resume-web-bcdbb.firebaseapp.com',
  projectId: 'resume-web-bcdbb',
  storageBucket: 'resume-web-bcdbb.appspot.com'
};

export let firebaseApp = null;
export function getFirebaseApp() {
  return firebaseApp;
}

export const androidCredential =
  process.env.ANDROID_FIREBASE_CREDENTIAL || '{}';

export const androidFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let androidFirebaseApp = null;
export function getAndroidFirebaseApp() {
  return androidFirebaseApp;
}

export const iosCredential = process.env.IOS_FIREBASE_CREDENTIAL || '{}';

export const iosFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let iosFirebaseApp = null;
export function getIosFirebaseApp() {
  return iosFirebaseApp;
}

export function firebaseServerInit() {
  try {
    if (typeof window === 'undefined') {
      const firebaseAdminAppStore = firebaseAdmin.INTERNAL.appStore.appStore;
      // console.log(firebaseAdmin.messaging);
      // console.log(firebaseAdmin.INTERNAL.appStore.appStore);
      // console.log(firebaseAdmin.appStore);
      // console.log(firebaseAdmin.getApp);
      if (firebaseAdminAppStore.get('[DEFAULT]')) {
        firebaseApp = firebaseAdminAppStore.get('[DEFAULT]');
      } else {
        firebaseApp = firebaseAdmin.initializeApp({
          ...firebaseConfig,
          credential: firebaseAdmin.credential.cert(JSON.parse(credential))
        });
      }
      if (firebaseAdminAppStore.get('androidFirebase')) {
        androidFirebaseApp = firebaseAdminAppStore.get('androidFirebase');
      } else {
        androidFirebaseApp = firebaseAdmin.initializeApp(
          {
            ...androidFirebaseConfig,
            credential: firebaseAdmin.credential.cert(
              JSON.parse(androidCredential)
            )
          },
          'androidFirebase'
        );
      }
      if (firebaseAdminAppStore.get('iosFirebase')) {
        iosFirebaseApp = firebaseAdminAppStore.get('iosFirebase');
      } else {
        iosFirebaseApp = firebaseAdmin.initializeApp(
          {
            ...iosFirebaseConfig,
            credential: firebaseAdmin.credential.cert(JSON.parse(iosCredential))
          },
          'iosFirebase'
        );
      }
    }
  } catch (error) {
    console.log(error);
  }

  return { firebaseApp, androidFirebaseApp, iosFirebaseApp };
}

// https://ithelp.ithome.com.tw/articles/10269342
// https://vercel.com/archer102125220/resume-web

firebaseServerInit();

let tokens = [];

export function registerTokens(token) {
  if (
    typeof token.token !== 'string' ||
    token.token === '' ||
    tokens.find(_token => _token.token === token.token) !== undefined
  ) {
    return tokens;
  }
  tokens.push(token);
  return tokens;
}

export function cancelTokens(token) {
  if (
    typeof token !== 'string' ||
    token === '' ||
    tokens.includes(token) === false
  ) {
    return tokens;
  }
  tokens = tokens.filter(_token => _token.token !== token);
  return tokens;
}

export function getTokens() {
  return tokens;
}
