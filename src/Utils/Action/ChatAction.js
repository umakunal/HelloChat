import {
  child,
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import {getFirebaseApp} from '../FirebaseHelper';

export const createChat = async (loggedInUserId, chatData) => {
  const newChatData = {
    ...chatData,
    createdBy: loggedInUserId,
    updatedBy: loggedInUserId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  console.log('newChatData', newChatData);
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const newChat = await push(child(dbRef, 'chats'), newChatData);

  console.log('newChat', newChat);
  const chatUsers = newChatData.users;
  for (let i = 0; i < chatUsers?.length; i++) {
    const userId = chatUsers[i];
    console.log('userId', userId);
    await push(child(dbRef, `usersChat/${userId}`), newChat.key);
  }

  return newChat.key;
};

export const sendTextMessage = async (
  chatId,
  senderId,
  messageText,
  replyTo,
) => {
  const app = getFirebaseApp();
  const dbRef = ref(getDatabase(app));
  const messagesRef = child(dbRef, `messages/${chatId}`);
  const messageData = {
    sentBy: senderId,
    sendAt: new Date().toISOString(),
    text: messageText,
  };

  if (replyTo) {
    messageData.replyTo = replyTo;
  }
  await push(messagesRef, messageData);
  const chatRef = child(dbRef, `chats/${chatId}`);
  await update(chatRef, {
    updatedBy: senderId,
    updatedAt: new Date().toISOString(),
    latestMessagetText: messageText,
  });
};

export const starMEssage = async (userId, chatId, messageId) => {
  try {
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const childRef = child(
      dbRef,
      `userStarredMessages/${userId}/${chatId}/${messageId}`,
    );
    const snapShot = await get(childRef);
    if (snapShot.exists()) {
      //Starred item already exists - unstar it
      await remove(childRef);
    } else {
      //Starred item does not exist - star it
      const starredMessageData = {
        messageId,
        chatId,
        starredAt: new Date().toISOString(),
      };
      await set(childRef, starredMessageData);
    }
  } catch (error) {
    console.log('Error occured while starring', error);
  }
};
