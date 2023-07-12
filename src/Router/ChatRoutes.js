import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScreenName} from '../Constants/ScreenName';
import {Chat, ChatSettings, Contact, NewChat} from '../Screen';
import TabRoutes from './TabRoutes';
import {useDispatch, useSelector} from 'react-redux';
import {getFirebaseApp} from '../Utils/FirebaseHelper';
import {child, get, getDatabase, off, onValue, ref} from 'firebase/database';
import {setChatsData} from '../store/chatSlice';
import {ActivityIndicatorBase, View} from 'react-native';
import {COLORS} from '../Theme/Colors';
import CommonStyle from '../Constants/CommonStyle';
import {setStoredUsers} from '../store/userSlice';
import {setChatsMessages, setStarredMessages} from '../store/messagesSlice';

const ChatRoutes = () => {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector(state => state.auth.userData);
  console.log('userData fro useSelector', userData);
  const storedUsers = useSelector(state => state.users.storedUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Subscribing to firebase listner');
    const app = getFirebaseApp();
    const dbRef = ref(getDatabase(app));
    const userChatsRef = child(dbRef, `usersChat/${userData.userId}`);
    const refs = [userChatsRef];
    onValue(userChatsRef, querySnapshot => {
      const chatIdsData = querySnapshot.val() || {};
      const chatIds = Object.values(chatIdsData);
      const chatsData = {};
      let chatFoundCount = 0;
      for (let i = 0; i < chatIds.length; i++) {
        const chatId = chatIds[i];
        const chatRef = child(dbRef, `chats/${chatId}`);
        refs.push(chatRef);

        onValue(chatRef, chatSnapshot => {
          console.log('chatSnapshot.val()', chatSnapshot.val());
          chatFoundCount++;
          const data = chatSnapshot.val();
          if (data) {
            data.key = chatSnapshot.key;
            data.users.forEach(userId => {
              if (storedUsers[userId]) return;
              const userRef = child(dbRef, `user/${userId}`);
              get(userRef).then(userSnapShot => {
                const userSnapshotData = userSnapShot.val();
                console.log('userSnapshotData========>', userSnapshotData);
                dispatch(setStoredUsers({newUsers: {userSnapshotData}}));
              });
              refs.push(userRef);
            });
            chatsData[chatSnapshot.key] = data;
            if (chatFoundCount >= chatIds.length) {
              dispatch(setChatsData({chatsData}));
              setIsLoading(false);
            }
          }
        });

        const messagesRef = child(dbRef, `messages/${chatId}`);
        refs.push(messagesRef);
        onValue(messagesRef, messageSnapshot => {
          const messagesData = messageSnapshot.val();
          dispatch(setChatsMessages({chatId, messagesData}));
        });

        if (chatFoundCount == 0) {
          setIsLoading(false);
        }
      }
    });

    const userStarredMessagesRef = child(
      dbRef,
      `userStarredMessages/${userData.userId}`,
    );
    // console.log('userStarredMessagesRef=========>', userStarredMessagesRef)
    refs.push(userStarredMessagesRef);
    onValue(userStarredMessagesRef, querySnapshot => {
      console.log('querySnapshot.val()+++++++++++', querySnapshot.val());
      const starredMessages = querySnapshot.val() ?? {};
      console.log('starredMessages=======++++>', starredMessages);
      dispatch(setStarredMessages(starredMessages));
    });

    return () => {
      console.log('Unsubscribing to firebase listner');
      refs.forEach(ref => off(ref));
    };
  }, []);

  if (isLoading) {
    <View style={CommonStyle.center}>
      <ActivityIndicatorBase size={'large'} color={COLORS.primary} />
    </View>;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
      }}>
      <Stack.Group>
        <Stack.Screen
          name={'Home'}
          component={TabRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ScreenName.chat}
          component={Chat}
          options={{
            headerTitle: 'Chat',
          }}
        />
        <Stack.Screen
          name={ScreenName.chatSettings}
          component={ChatSettings}
          options={{
            headerTitle: 'Chat Sttings',
          }}
        />
        <Stack.Screen
          name={ScreenName.contact}
          component={Contact}
          options={{
            headerTitle: 'Contact Info',
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'containedModal'}}>
        <Stack.Screen
          name={ScreenName.newChat}
          component={NewChat}
          options={{
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ChatRoutes;
