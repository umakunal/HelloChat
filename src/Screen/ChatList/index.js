//import liraries
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Button, FlatList} from 'react-native';
import {ScreenName} from '../../Constants/ScreenName';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/CustomHeaderButton';
import {useSelector} from 'react-redux';
import DataItem from '../../Components/DataItem';
import PageContainer from '../../Components/PageContainer';
import PageTitle from '../../Components/PageTitle';

// create a component
const ChatList = props => {
  const navigation = useNavigation();
  const selectedUser = props.route?.params?.selectedUserId;
  const userData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);
  const usersChats = useSelector(state => {
    const chatsData = state.chats.chatsData;
    return Object.values(chatsData).sort((a, b) => {
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
  });
  console.log('usersChats', usersChats);
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
    <PageContainer>
      <PageTitle title="Chats" />
      <FlatList
        data={usersChats}
        renderItem={itemData => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const otherUserID = chatData.users.find(
            uuid => uuid !== userData.userId,
          );
          const otherUser = storedUsers[otherUserID];
          if (!otherUser) return;
          const title = `${otherUser?.firstName} ${otherUser?.lastName}`;
          const subTitle = 'This will be a message...';
          const image = otherUser?.profilePicture;
          console.log('chatId', chatId);
          return (
            <DataItem
              title={title}
              subTitle={subTitle}
              image={image}
              onPress={() => {
                navigation.navigate(ScreenName.chat, {
                  chatId,
                });
              }}
            />
          );
        }}
        keyExtractor={item => item.key}
      />
    </PageContainer>
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
