//import liraries
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Button} from 'react-native';
import {ScreenName} from '../../Constants/ScreenName';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/CustomHeaderButton';
import {useSelector} from 'react-redux';

// create a component
const ChatList = props => {
  const navigation = useNavigation();
  const selectedUser = props.route?.params?.selectedUserId;
  const userData = useSelector(state => state.auth.userData);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="New Chat"
            iconName="create-outline"
            onPress={() => {
              props.navigation.navigate(ScreenName.newChat);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, []);

  useEffect(() => {
    if (!selectedUser) {
      return;
    }
    const chatUser = [selectedUser, userData.userId];
    const navigationProps = {
      newChatData: {users: chatUser},
    };
    navigation.navigate(ScreenName.chat, navigationProps);
  }, [props.route?.params]);

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
