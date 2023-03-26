//import liraries
import React, {Component, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from './src/Theme/Fonts';
import RNBootSplash from 'react-native-bootsplash';
import MainRouter from './src/Router/Router';

// create a component
const App = () => {
  useEffect(() => {
    RNBootSplash.hide({fade: true});
    console.log('Bootsplash has been hidden successfully');
  }, []);
  return (
    <>
      <MainRouter />
    </>
  );
};

//make this component available to the app
export default App;
