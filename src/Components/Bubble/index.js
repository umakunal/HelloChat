//import liraries
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Fonts} from '../../Theme/Fonts';
import {COLORS} from '../../Theme/Colors';
import {
  fullWidth,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import uuid from 'react-native-uuid';
import Clipboard from '@react-native-clipboard/clipboard';
import {async} from 'validate.js';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {starMEssage} from '../../Utils/Action/ChatAction';
import {useSelector} from 'react-redux';

// create a component
function formatDate(dateString) {
  const date = new Date(dateString);
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

const MenuItem = props => {
  const Icon = props.iconPack ?? Feather;
  return (
    <MenuOption onSelect={props.onSelect}>
      <View style={styles.menuItemContaner}>
        <Text style={styles.menuText}>{props.text}</Text>
        <Icon name={props.icon} size={18} />
      </View>
    </MenuOption>
  );
};

const Bubble = props => {
  const {
    text,
    type,
    messageId,
    userId,
    chatId,
    date,
    setReply,
    replyingTo,
    name,
    imageUrl,
  } = props;
  const starredMessages = useSelector(
    state => state.messages.starredMessage[chatId] ?? {},
  );

  const storedUser = useSelector(state => state.users.storedUsers);
  // console.log('date==>', date);
  const menuRef = useRef(null);
  const id = useRef(uuid.v4());
  const bubbleStyle = {...styles.container};
  const textStyle = {...styles.text};
  const wrapperStyle = {...styles.wrapper};
  let Container = View;
  let isUserMessage = false;
  const dateString = date && formatDate(date);
  switch (type) {
    case 'system':
      textStyle.color = '#65644A';
      bubbleStyle.backgroundColor = COLORS.beige;
      bubbleStyle.alignItems = 'center';
      bubbleStyle.marginTop = verticalScale(10);
      break;
    case 'error':
      textStyle.color = COLORS.white;
      bubbleStyle.backgroundColor = COLORS.red2;
      bubbleStyle.alignItems = 'center';
      bubbleStyle.marginTop = verticalScale(10);
      break;
    case 'myMessage':
      wrapperStyle.justifyContent = 'flex-end';
      isUserMessage = true;
      bubbleStyle.backgroundColor = '#ffefc7';
      bubbleStyle.maxWidth = fullWidth * 0.9;
      Container = TouchableWithoutFeedback;
      break;
    case 'theirMessage':
      bubbleStyle.backgroundColor = '#fff';
      wrapperStyle.justifyContent = 'flex-start';
      isUserMessage = false;
      bubbleStyle.maxWidth = fullWidth * 0.9;
      Container = TouchableWithoutFeedback;
      break;

    case 'reply':
      bubbleStyle.backgroundColor = '#f2f2f2';
    default:
      break;
  }

  const copyToClipboaard = async text => {
    try {
      await Clipboard.setString(text);
    } catch (error) {
      console.log('error occured while copying text to clipboard', error);
    }
  };

  const isStarred = isUserMessage && starredMessages[messageId] !== undefined;
  const replyingToUser = replyingTo && storedUser[replyingTo.sentBy];
  return (
    <View style={wrapperStyle}>
      <Container
        onLongPress={() => {
          'menuRef.current',
            menuRef.current.props.ctx.menuActions.openMenu(id.current);
        }}
        style={{width: fullWidth * 0.9}}>
        <View style={bubbleStyle}>
          {name && <Text style={styles.name}>{name}</Text>}
          {replyingToUser && (
            <Bubble
              type="reply"
              text={replyingTo.text}
              name={`${replyingToUser.firstName} ${replyingToUser.lastName}`}
            />
          )}
          {!imageUrl && <Text style={textStyle}>{text}</Text>}

          {imageUrl && <Image source={{uri: imageUrl}} style={styles.image} />}
          {dateString && (
            <View style={styles.timeContainer}>
              {isStarred ? (
                <FontAwesome
                  name="star"
                  size={18}
                  color={COLORS.primary}
                  style={{marginRight: horizontalScale(5)}}
                />
              ) : null}
              <Text style={styles.time}>{dateString}</Text>
            </View>
          )}

          <Menu name={id.current} ref={menuRef}>
            <MenuTrigger />
            <MenuOptions>
              <MenuItem
                icon={'copy'}
                text="Copy to clipboard"
                onSelect={() => {
                  copyToClipboaard(text);
                }}
              />
              <MenuItem
                icon={isStarred ? 'star' : 'star-o'}
                iconPack={FontAwesome}
                text={`${isStarred ? 'Unstar' : 'Star'} message`}
                onSelect={() => {
                  console.log('messageId', messageId);
                  console.log('chatId', chatId);
                  console.log('userId', userId);
                  starMEssage(userId, chatId, messageId);
                }}
              />
              <MenuItem
                icon={'arrow-left-circle'}
                text="Reply"
                onSelect={setReply}
              />
            </MenuOptions>
          </Menu>
        </View>
      </Container>
    </View>
  );
};
// define your styles
const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(6),
    padding: moderateScale(5),
    marginBottom: verticalScale(10),
    borderColor: '#E2DACC',
    borderWidth: 1,
  },
  text: {
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
    color: COLORS.textColor,
  },
  menuItemContaner: {
    flexDirection: 'row',
    padding: moderateScale(5),
  },
  menuText: {
    flex: 1,
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
    fontSize: moderateScale(12),
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  time: {
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
    color: COLORS.grey,
    fontSize: moderateScale(12),
  },
  name: {
    fontFamily: Fonts.medium,
    letterSpacing: 0.3,
  },
  image: {
    width: moderateScale(200),
    height: moderateScale(200),
    marginBottom: verticalScale(5),
  },
});

//make this component available to the app
export default Bubble;
