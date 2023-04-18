import {getFirebaseApp} from '../FirebaseHelper';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {child, getDatabase, ref, set} from 'firebase/database';
import {authenticate, logout} from '../../store/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserData} from './userAction';

let timer;
export const signUp = (firstName, lastName, email, password) => {
  console.log('SignUp Data', firstName, lastName, email, password);
  return async dispatch => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const {uid, stsTokenManager} = result.user;
      const {accessToken, expirationTime} = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const milisecondUntilExpiry = expiryDate - timeNow;
      const userData = await createUser(firstName, lastName, email, uid);
      dispatch(authenticate({token: accessToken, userData}));
      saveDateToStorage(accessToken, uid, expiryDate);

      timer = setTimeout(() => {
        dispatch(userLogout());
      }, milisecondUntilExpiry);
    } catch (error) {
      const errorCode = error.code;
      let message = 'Something went wrong!';
      if (errorCode === 'auth/email-already-in-use') {
        message = 'This email is already in use';
      }
      throw new Error(message);
      // console.log('Error while creating user with firebase', error.code);
    }
  };
};

export const userLogout = () => {
  return async dispatch => {
    AsyncStorage.clear();
    clearTimeout(timer);
    dispatch(logout());
  };
};
export const signIn = (email, password) => {
  console.log('email from signin page', email);
  console.log('password from signin page', password);
  return async dispatch => {
    const app = getFirebaseApp();
    const auth = getAuth(app);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const {uid, stsTokenManager} = result.user;
      const {accessToken, expirationTime} = stsTokenManager;
      const expiryDate = new Date(expirationTime);
      const timeNow = new Date();
      const milisecondUntilExpiry = expiryDate - timeNow;
      const userData = await getUserData(uid);
      dispatch(authenticate({token: accessToken, userData}));
      saveDateToStorage(accessToken, uid, expiryDate);
      timer = setTimeout(() => {
        dispatch(userLogout());
      }, milisecondUntilExpiry);
    } catch (error) {
      const errorCode = error.code;
      let message = 'Something went wrong!';
      if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found'
      ) {
        message = 'The email or password was incorrect';
      }
      console.log('Error while logging in  user with firebase', message);
      throw new Error(message);
    }
  };
};

const createUser = async (firstName, lastName, email, userId) => {
  const firstLast = `${firstName} ${lastName}`.toLowerCase();
  const userData = {
    firstName,
    lastName,
    email,
    userId,
    signUpDate: new Date().toISOString(),
  };
  const dbRef = ref(getDatabase());
  const childRef = child(dbRef, `user/${userId}`);
  await set(childRef, userData);
  return userData;
};

const saveDateToStorage = (token, userId, expiryDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate,
    }),
  );
};
