//import liraries
import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {
  fullWidth,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';
import {Fonts} from '../../Theme/Fonts';

// create a component
const CustomInput = props => {
  const [Value, setValue] = useState(props.initialValue);
  const onChangeText = text => {
    setValue(text);
    props.onInputChanged && props.onInputChanged(props.id, text);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        {props.icon && (
          <props.iconPack
            style={styles.icon}
            name={props.icon}
            size={props.iconSize || 15}
            color="black"
          />
        )}
        <TextInput
          {...props}
          value={Value}
          style={styles.input}
          onChangeText={onChangeText}
        />
      </View>
      {props.errorText && (
        <View style={StyleSheet.errorContainer}>
          <Text style={styles.errorText}>{props.errorText[0]}</Text>
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginVertical: verticalScale(8),
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
    color: COLORS.textColor,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.nearlyWhite,
    paddingHorizontal: horizontalScale(10),
    // paddingVertical: verticalScale(15),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(2),
  },
  icon: {
    marginRight: horizontalScale(10),
    color: COLORS.grey,
  },
  input: {
    color: COLORS.textColor,
    flex: 1,
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
    paddingTop: 0,
    // backgroundColor:'red'
  },
  errorContainer: {
    marginVertical: verticalScale(5),
  },
  errorText: {
    color: COLORS.red,
    fontSize: moderateScale(13),
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
  },
});

//make this component available to the app
export default CustomInput;
