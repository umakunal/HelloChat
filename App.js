//import liraries
import React, {Component, useEffect} from 'react';
import {LogBox} from 'react-native';
import {Fonts} from './src/Theme/Fonts';
import RNBootSplash from 'react-native-bootsplash';
import MainRouter from './src/Router/Router';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native']);
// AsyncStorage.clear();
const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
    console.log('Bootsplash has been hidden successfully');
  }, []);
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
};

//make this component available to the app
export default App;
