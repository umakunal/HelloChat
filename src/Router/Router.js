import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Auth} from '../Screen';
import ChatRoutes from './ChatRoutes';
import {useSelector} from 'react-redux';
import StartUp from '../Screen/StartUp/index'

const MainRouter = () => {
  const isAuth = useSelector(
    state => state.auth.token !== null && state.auth.token !== '',
  );
  const didTryAutoLogin = useSelector(state => state.auth.setDidTryAutoLogin);
  console.log('didTryAutoLogin', didTryAutoLogin);
  return (
    <NavigationContainer>
      {isAuth && <ChatRoutes />}
      {!isAuth && didTryAutoLogin && <Auth />}
      {!isAuth && !didTryAutoLogin && <StartUp />}
    </NavigationContainer>
  );
};

export default MainRouter;
