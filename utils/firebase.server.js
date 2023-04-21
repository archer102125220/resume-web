export const credential = process.env.FIREBASE_CREDENTIAL || '{}';

export const firebaseConfig = {
  authDomain: 'httpsbibiancojp.firebaseapp.com',
  projectId: 'httpsbibiancojp',
  storageBucket: 'httpsbibiancojp.appspot.com'
};

export let firebaseApp;

export async function firebaseServerInit() {
  try {
    if (typeof window === 'undefined') {
      const firebaseAdmin = await import('firebase-admin');
      firebaseApp = firebaseAdmin.initializeApp({
        ...firebaseConfig,
        credential: firebaseAdmin.credential.cert(JSON.parse(credential))
      });
    }
  } catch (error) {
    console.log(error);
  }

  return { firebaseApp };
}
