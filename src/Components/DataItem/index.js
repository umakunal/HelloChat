//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import ProfileImage from '../ProfileImage';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';
import {COLORS} from '../../Theme/Colors';
import {Fonts} from '../../Theme/Fonts';

// create a component
const DataItem = props => {
  const {title, subTitle, image, onPress} = props;
  console.log('Image uri', image);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        onPress();
      }}>
      <View style={styles.container}>
        <ProfileImage uri={image} size={40} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={1} style={styles.subTitle}>
            {subTitle}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: verticalScale(10),
    borderBottomColor: COLORS.extraLightGrey,
    borderBottomWidth: 1,
    alignItems: 'center',
    minHeight: verticalScale(50),
  },
  textContainer: {
    marginLeft: horizontalScale(14),
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: moderateScale(16),
    letterSpacing: 0.3,
  },
  subTitle: {
    fontFamily: Fonts.regular,
    color: COLORS.grey,
    letterSpacing: 0.3,
  },
});

//make this component available to the app
export default DataItem;
