import {
  child,
  endAt,
  get,
  getDatabase,
  orderByChild,
  query,
  ref,
  startAt,
} from 'firebase/database';
import {getFirebaseApp} from '../FirebaseHelper';
import {async} from 'validate.js';

export const getUserData = async userId => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    console.log('dbRef', dbRef);
    const userRef = child(dbRef, `user/${userId}`);
    const snapshot = await get(userRef);
    return snapshot.val();
  } catch (error) {
    console.log('error occured', error);
  }
};

export const searchUser = async queryText => {
  const searchTerm = queryText.toLowerCase();
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userRef = child(dbRef, 'user');
    const queryRef = query(
      userRef,
      orderByChild('firstLast'),
      startAt(searchTerm),
      endAt(searchTerm + '\uf8ff'),
    );
    const snapshot = await get(queryRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return {};
  } catch (error) {
    console.log('error searching user from database ', error);
    throw error;
  }
};
