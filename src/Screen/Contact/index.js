//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import PageContainer from '../../Components/PageContainer';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import ProfileImage from '../../Components/ProfileImage';
import PageTitle from '../../Components/PageTitle';
import {Fonts} from '../../Theme/Fonts';
import {COLORS} from '../../Theme/Colors';
import {getUserChats} from '../../Utils/Action/userAction';
import {async} from 'validate.js';
import DataItem from '../../Components/DataItem';
import { ScreenName } from '../../Constants/ScreenName';

// create a component
const Contact = props => {
  const storedUsers = useSelector(state => state.users.storedUsers);
  const currentUser = storedUsers[props.route?.params?.uid];
  const storedChats = useSelector(state => state.chats.chatsData);
  const [commonChats, setCommonChats] = useState([]);
  useEffect(() => {
    getCurrentUserChats();
  }, []);
  const getCurrentUserChats = async () => {
    const currentUserChats = await getUserChats(currentUser.userId);
    let commonChatsData = Object.values(currentUserChats).filter(cid => {
      return storedChats[cid] && storedChats[cid].isGroupChat;
    });
    setCommonChats(commonChatsData);
  };
  return (
    <PageContainer>
      <View style={styles.topContainer}>
        <ProfileImage
          uri={currentUser?.profilePicture}
          size={moderateScale(80)}
          //   style={{marginBottom: verticalScale(10)}}
        />
        <PageTitle
          title={` ${currentUser?.firstName}  ${currentUser?.lastName}`}
        />
        {currentUser.about && (
          <Text style={styles.about} numberOfLines={2}>
            {currentUser?.about}
          </Text>
        )}
      </View>
      {commonChats.length > 0 && (
        <>
          <Text style={styles.heading}>
            {commonChats.length} {commonChats.length === 1 ? 'Group' : 'Groups'}{' '}
            in Common
          </Text>
          {commonChats.map(cid => {
            const chatData = storedChats[cid];
            console.log('chatData=======>', chatData);
            return (
              <DataItem
                key={cid}
                title={chatData.chatName}
                subTitle={chatData.latestMessagetText}
                type = "link"
                onPress={() => {
                  props.navigation.push(ScreenName.chat, {
                    chatId: cid,
                    // newChatData: chatData,
                  });
                }}
              />
            );
          })}
        </>
      )}
    </PageContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(20),
  },
  about: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(16),
    letterSpacing: 0.3,
    color: COLORS.grey,
    textAlign: 'center',
    lineHeight: verticalScale(25),
  },
  heading: {
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
    color: COLORS.textColor,
    marginVertical: verticalScale(8),
  },
});

//make this component available to the app
export default Contact;
