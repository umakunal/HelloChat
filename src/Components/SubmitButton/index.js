//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';

// create a component
const SubmitButton = props => {
  const enableBGColor = props.color || COLORS.primary;
  const disableBGColor = COLORS.lightGrey;
  const bgColor = props.disabled ? disableBGColor : enableBGColor;
  return (
    <TouchableOpacity
      onPress={props.disabled ? () => {} : props.onPress}
      style={[styles.submit, {backgroundColor: bgColor},{...props.style}]}>
      <Text style={{color: props.disabled ? COLORS.grey : COLORS.white}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  submit: {
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default SubmitButton;
