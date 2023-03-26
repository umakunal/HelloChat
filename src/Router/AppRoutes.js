import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {ScreenName} from '../Constants/ScreenName';
import {Chat, ChatSettings, Settings} from '../Screen';
import TabRoutes from './TabRoutes';

const ChatRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
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
    </Stack.Navigator>
  );
};

export default ChatRoutes;
