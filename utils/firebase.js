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
  apiKey: 'AIzaSyDrkQ39bol9ac4MJHDg4knwMz5fm9jzzio',
  authDomain: 'resume-web-223c3.firebaseapp.com',
  projectId: 'resume-web-223c3',
  storageBucket: 'resume-web-223c3.appspot.com',
  messagingSenderId: '645521973503',
  appId: '1:645521973503:web:63734a3ccd99fb1037acca',
  measurementId: 'G-EDV5FF65FE',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
