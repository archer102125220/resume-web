// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore/lite';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'resume-web-223c3.firebaseapp.com',
  projectId: 'resume-web-223c3',
  storageBucket: 'resume-web-223c3.appspot.com',
  messagingSenderId: '645521973503',
  appId: '1:645521973503:web:63734a3ccd99fb1037acca',
  measurementId: 'G-EDV5FF65FE',
};


export let app;
export let analytics;
export let db;

// Initialize Firebase
export function init() {
  if (typeof window === 'object') {
    app = initializeApp(firebaseConfig);
    analytics = getAnalytics(app);
    db = getFirestore(app);
  }
}
