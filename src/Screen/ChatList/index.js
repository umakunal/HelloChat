//import liraries
import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Button} from 'react-native';
import {ScreenName} from '../../Constants/ScreenName';

// create a component
const ChatList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>ChatList</Text>
      <Button
        title="Go to Chat"
        onPress={() => {
          navigation.navigate(ScreenName.chat);
        }}
      />
    </View>
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
});

//make this component available to the app
export default ChatList;
