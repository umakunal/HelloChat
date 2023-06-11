//import liraries
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';
import {ImagePath} from '../../Theme/ImagePath';
import {COLORS} from '../../Theme/Colors';
import {useSelector} from 'react-redux';
import Bubble from '../../Components/Bubble';
import PageContainer from '../../Components/PageContainer';
import {createChat} from '../../Utils/Action/ChatAction';

// create a component
const Chat = props => {
  const [MessageText, setMessageText] = useState('');
  const [ChatId, setChatId] = useState(props.route?.params?.chatId);
  const UserData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);
  const storedChats = useSelector(state => state.chats.chatsData);
  const chatData =
    (ChatId && storedChats[ChatId]) || props.route?.params?.newChatData;

  const [ChatUser, setChatUser] = useState([]);

  const getChatTileFromName = () => {
    const otherUserId = ChatUser.find(uid => uid !== UserData.userId);
    const otherUserData = storedUsers[otherUserId];
    return (
      otherUserData && `${otherUserData.firstName} ${otherUserData.lastName}`
    );
  };
  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: getChatTileFromName(),
    });
    setChatUser(chatData.users);
  }, [ChatUser]);

  // console.log('ChatData', chatData);

  const sendMessage = useCallback(async () => {
    try {
      let id = ChatId;
      if (!id) {
        id = await createChat(UserData.userId, props.route.params.newChatData);
        console.log('Id', id);
        setChatId(id);
        //No chat Id. Create the chat
      }
    } catch (error) {
      console.log('error ocurred while sending message', error);
    }

    setMessageText('');
  }, [MessageText, ChatId]);
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={100}>
        <ImageBackground
          source={ImagePath.background}
          style={styles.backgroundImage}>
          <PageContainer style={{backgroundColor: 'transparent'}}>
            {!ChatId && (
              <Bubble text={'This is new chat. Say Hi'} type={'system'} />
            )}
          </PageContainer>
        </ImageBackground>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.mediaButton} onPress={() => {}}>
            <Feather name="plus" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <TextInput
            style={styles.textBox}
            value={MessageText}
            onChangeText={val => setMessageText(val)}
            onSubmitEditing={() => sendMessage()}
          />
          {MessageText === '' ? (
            <TouchableOpacity style={styles.mediaButton}>
              <Feather name="camera" size={24} color={COLORS.primary} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => sendMessage()}>
              <Feather name="send" size={20} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(10),
    // height: verticalScale(50),
  },
  textBox: {
    flex: 1,
    color: COLORS.black,
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: moderateScale(50),
    borderColor: COLORS.grey,
    marginHorizontal: horizontalScale(15),
    paddingHorizontal: horizontalScale(15),
  },
  mediaButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: horizontalScale(35),
  },
  sendButton: {
    width: horizontalScale(35),
    height: horizontalScale(35),
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(8),
    backgroundColor: COLORS.primary,
    borderRadius: moderateScale(50),
  },
});

//make this component available to the app
export default Chat;
