// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const getFirebaseApp = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyB85DITREzrG_d7OPx4zxWWp3AjLkBGcus',
    authDomain: 'hellochat-42843.firebaseapp.com',
    projectId: 'hellochat-42843',
    storageBucket: 'hellochat-42843.appspot.com',
    messagingSenderId: '176276638006',
    appId: '1:176276638006:web:079eda116bd06f90068b97',
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
