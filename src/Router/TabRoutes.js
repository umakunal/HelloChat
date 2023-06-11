// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {ScreenName} from '../Constants/ScreenName';
import {ChatList, Settings} from '../Screen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TabRoutes = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{headerTitle: '', headerShadowVisible: false}}>
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
