import {getFirebaseApp} from '../FirebaseHelper';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

export const signUp = async (firstName, lastName, email, password) => {
  const app = getFirebaseApp();
  const auth = getAuth(app);

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log('firebase result', result);
  } catch (error) {
    console.log('Error while creating user with firebase', error);
  }
};
