import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Auth, ChatSettings} from '../Screen';
import AppRoutes from './AppRoutes';
import {useSelector} from 'react-redux';
import StartUp from '../Screen/StartUp';

const MainRouter = () => {
  const isAuth = useSelector(
    state => state.auth.token !== null && state.auth.token !== '',
  );
  const didTryAutoLogin = useSelector(state => state.auth.setDidTryAutoLogin);
  console.log('didTryAutoLogin', didTryAutoLogin)
  return (
    <NavigationContainer>
      {isAuth && <AppRoutes />}
      {!isAuth && didTryAutoLogin && <Auth />}
      {!isAuth && !didTryAutoLogin && <StartUp />}
    </NavigationContainer>
  );
};

export default MainRouter;
