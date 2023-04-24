export const credential = process.env.FIREBASE_CREDENTIAL || '{}';

export const firebaseConfig = {
  authDomain: 'resume-web-bcdbb.firebaseapp.com',
  projectId: 'resume-web-bcdbb',
  storageBucket: 'resume-web-bcdbb.appspot.com'
};

export let firebaseApp;

export const androidCredential =
  process.env.ANDROID_FIREBASE_CREDENTIAL || '{}';

export const androidFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let androidFirebaseApp;

export const iosCredential = process.env.IOS_FIREBASE_CREDENTIAL || '{}';

export const iosFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};
export let iosFirebaseApp;

export async function firebaseServerInit() {
  try {
    if (typeof window === 'undefined') {
      const firebaseAdmin = await import('firebase-admin');
      firebaseApp = firebaseAdmin.initializeApp({
        ...firebaseConfig,
        credential: firebaseAdmin.credential.cert(JSON.parse(credential))
      });
      androidFirebaseApp = firebaseAdmin.initializeApp(
        {
          ...androidFirebaseConfig,
          credential: firebaseAdmin.credential.cert(
            JSON.parse(androidCredential)
          )
        },
        'androidFirebase'
      );
      iosFirebaseApp = firebaseAdmin.initializeApp(
        {
          ...androidFirebaseConfig,
          credential: firebaseAdmin.credential.cert(JSON.parse(iosCredential))
        },
        'iosFirebase'
      );
    }
  } catch (error) {
    console.log(error);
  }

  return { firebaseApp, androidFirebaseApp, iosFirebaseApp };
}

let tokens = [];

export function registerTokens(token) {
  if (typeof token !== 'string' || token === '') {
    return;
  }
  tokens.push(token);
}

export function cancelTokens(token) {
  if (typeof token !== 'string' || token === '') {
    return;
  }
  tokens.push(token);
  tokens = tokens.filter(_token => _token !== token);
}

export function getTokens() {
  return tokens;
}
