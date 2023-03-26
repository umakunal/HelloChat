import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { Auth, ChatSettings } from '../Screen';
import AppRoutes from './AppRoutes';

const MainRouter = () => {
  const isAuth = false;
  return (
    <NavigationContainer>
      {isAuth&&<AppRoutes />}
      {!isAuth&&<Auth />}
    </NavigationContainer>
  );
};

export default MainRouter;
