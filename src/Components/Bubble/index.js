//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Fonts} from '../../Theme/Fonts';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';

// create a component
const Bubble = props => {
  const {text, type} = props;

  const bubbleStyle = {...styles.container};
  const textStyle = {...styles.text};

  switch (type) {
    case 'system':
      textStyle.color = '#65644A';
      bubbleStyle.backgroundColor = COLORS.beige;
      bubbleStyle.alignItems = 'center';
      bubbleStyle.marginTop = verticalScale(10);
      break;

    default:
      break;
  }

  return (
    <View style={styles.wrapper}>
      <View style={bubbleStyle}>
        <Text style={textStyle}>{text}</Text>
      </View>
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
  },
});

//make this component available to the app
export default Bubble;
