//import liraries
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {ScreenName} from '../../Constants/ScreenName';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/CustomHeaderButton';
import {useSelector} from 'react-redux';
import DataItem from '../../Components/DataItem';
import PageContainer from '../../Components/PageContainer';
import PageTitle from '../../Components/PageTitle';
import {COLORS} from '../../Theme/Colors';
import {moderateScale} from '../../Theme/Dimentions';

// create a component
const ChatList = props => {
  const navigation = useNavigation();
  const selectedUser = props.route?.params?.selectedUserId;
  const selectedUserList = props.route?.params?.selectedUsers;
  const chatName = props.route?.params?.ChatName;
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
    if (!selectedUser && !selectedUserList) {
      return;
    }

    let chatData;
    let navigationProps;
    if (selectedUser) {
      chatData = usersChats.find(
        cd => !cd.isGroupChat && cd.users.includes(selectedUser),
      );
    }

    if (chatData) {
      navigationProps = {
        chatId: chatData.key,
      };
    } else {
      const chatUsers = selectedUserList || [selectedUser, userData.userId];
      if (!chatUsers.includes(userData.userId)) {
        chatUsers.push(userData.userId);
      }
      navigationProps = {
        newChatData: {
          users: chatUsers,
          isGroupChat: selectedUserList !== undefined,
          chatName,
        },
      };
    }
    navigation.navigate(ScreenName.chat, navigationProps);
  }, [props.route?.params]);

  return (
    <PageContainer>
      <PageTitle title="Chats" />
      <View>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate(ScreenName.newChat, {isGroupChat: true})
          }>
          <Text style={styles.newGroupText}>New Group</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={usersChats}
        renderItem={itemData => {
          const chatData = itemData.item;
          const chatId = chatData.key;
          const isGroupChat = chatData.isGroupChat;

          let title = '';
          const subTitle = chatData.latestMessagetText || 'New Chat';
          let image = '';
          if (isGroupChat) {
            title = chatData.chatName;
            image = chatData.chatImage;
          } else {
            const otherUserID = chatData.users.find(
              uuid => uuid !== userData.userId,
            );
            const otherUser = storedUsers[otherUserID];
            if (!otherUser) return;
            title = `${otherUser?.firstName} ${otherUser?.lastName}`;
            image = otherUser?.profilePicture;
          }
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
  newGroupText: {
    color: COLORS.primary,
    fontSize: moderateScale(17),
  },
});

//make this component available to the app
export default ChatList;
