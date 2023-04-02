import {getFirebaseApp} from '../FirebaseHelper';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import {child, getDatabase, ref, set} from 'firebase/database';

export const signUp = async (firstName, lastName, email, password) => {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const {uid} = result.user;
    const userData = await createUser(firstName, lastName, email, uid);
    console.log('UserData===>', userData);
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
