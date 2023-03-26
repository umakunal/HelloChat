import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppRoutes from './AppRoutes'

const MainRouter = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default MainRouter;
