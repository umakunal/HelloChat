import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Auth, ChatSettings} from '../Screen';
import AppRoutes from './AppRoutes';
import {useSelector} from 'react-redux';

const MainRouter = () => {
  const isAuth = useSelector(
    state => state.auth.token !== null && state.auth.token !== '',
  );
  return (
    <NavigationContainer>
      {isAuth && <AppRoutes />}
      {!isAuth && <Auth />}
    </NavigationContainer>
  );
};

export default MainRouter;
