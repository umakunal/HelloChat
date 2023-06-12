//import liraries
import React, {Component} from 'react';
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

// create a component
const Bubble = props => {
  const {text, type} = props;

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

  return (
    <View style={wrapperStyle}>
      <Container
        onLongPress={() => {
          console.warn('This is message');
        }}
        style={{width: fullWidth*0.90}}>
        <View style={bubbleStyle}>
          <Text style={textStyle}>{text}</Text>
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
    color:COLORS.textColor
  },
});

//make this component available to the app
export default Bubble;
