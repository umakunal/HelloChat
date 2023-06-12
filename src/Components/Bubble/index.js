//import liraries
import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Fonts} from '../../Theme/Fonts';
import {COLORS} from '../../Theme/Colors';
import {fullWidth, moderateScale, verticalScale} from '../../Theme/Dimentions';
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

// create a component

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
  const {text, type} = props;
  const menuRef = useRef(null);
  const id = useRef(uuid.v4());
  const bubbleStyle = {...styles.container};
  const textStyle = {...styles.text};
  const wrapperStyle = {...styles.wrapper};
  let Container = View;

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
      bubbleStyle.backgroundColor = '#ffefc7';
      bubbleStyle.maxWidth = fullWidth * 0.9;
      Container = TouchableWithoutFeedback;
      break;
    case 'theirMessage':
      wrapperStyle.justifyContent = 'flex-start';
      bubbleStyle.maxWidth = fullWidth * 0.9;
      Container = TouchableWithoutFeedback;
      break;

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
  return (
    <View style={wrapperStyle}>
      <Container
        onLongPress={() => {
          'menuRef.current',
            menuRef.current.props.ctx.menuActions.openMenu(id.current);
        }}
        style={{width: fullWidth * 0.9}}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
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
                icon={'star-o'}
                iconPack={FontAwesome}
                text="Start Message"
                onSelect={() => {
                  copyToClipboaard(text);
                }}
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
});

//make this component available to the app
export default Bubble;
