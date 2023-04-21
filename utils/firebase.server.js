export const credential = process.env.FIREBASE_CREDENTIAL || '{}';

export const firebaseConfig = {
  authDomain: 'resume-web-bcdbb.firebaseapp.com',
  projectId: 'resume-web-bcdbb',
  storageBucket: 'resume-web-bcdbb.appspot.com'
};

export const androidCredential =
  process.env.ANDROID_FIREBASE_CREDENTIAL || '{}';

export const androidFirebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};

export let firebaseApp;
export let androidFirebaseApp;

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
    }
  } catch (error) {
    console.log(error);
  }

  return { firebaseApp };
}
