import {child, getDatabase, push, ref} from 'firebase/database';
import {getFirebaseApp} from '../FirebaseHelper';

export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  console.log('newChatData', newChatData)
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const newChat = await push(child(dbRef, 'chats'), newChatData);

  console.log('newChat', newChat)
  const chatUsers = newChatData.users;
  for (let i = 0; i < chatUsers?.length; i++) {
    const userId = chatUsers[i];
    console.log('userId', userId);
    await push(child(dbRef, `usersChat/${userId}`), newChat.key);
  }

  return newChat.key;
};
