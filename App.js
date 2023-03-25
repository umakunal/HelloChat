//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Fonts } from './src/Theme/Fonts';

// create a component
const App = () => {
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <Text style={styles.label}>App</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    color: '#000',
    fontSize: 30,
    fontFamily:Fonts.bold
  },
});

//make this component available to the app
export default App;
