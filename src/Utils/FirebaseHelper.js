// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export const getFirebaseApp = () => {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAxfu276iUAqC0_WtDLik7xpb4eDzncBqY",
    authDomain: "hellochat-c8949.firebaseapp.com",
    projectId: "hellochat-c8949",
    storageBucket: "hellochat-c8949.appspot.com",
    messagingSenderId: "689186904033",
    appId: "1:689186904033:web:b897b7e9948c0b121224a0",
    measurementId: "G-KQRZXQFYD0"
  };

  // Initialize Firebase
  return initializeApp(firebaseConfig);
};
