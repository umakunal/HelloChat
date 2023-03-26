// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ScreenName} from '../Constants/ScreenName';
import {Chat, ChatList, Settings} from '../Screen';
import ChatRoutes from './AppRoutes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Zocial from 'react-native-vector-icons/Zocial';

const TabRoutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator screenOptions={{headerTitle: ''}}>
      <Tab.Screen
        name={ScreenName.chatList}
        component={ChatList}
        options={{
          tabBarLabel: 'Chats',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="chatbubble-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenName.settings}
        component={Settings}
        options={{
          tabBarLabel: 'Sttings',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
