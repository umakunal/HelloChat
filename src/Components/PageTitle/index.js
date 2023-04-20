//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import {COLORS} from '../../Theme/Colors';
import {Fonts} from '../../Theme/Fonts';

// create a component
const PageTitle = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: moderateScale(28),
    color: COLORS.textColor,
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
  },
});

//make this component available to the app
export default PageTitle;
