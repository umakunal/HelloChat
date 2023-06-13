//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import {horizontalScale, moderateScale} from '../../Theme/Dimentions';
import {Fonts} from '../../Theme/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';

// create a component
const ReplyTo = props => {
  const {text, user, onCancel} = props;
  const name = `${user.firstName} ${user.lastName}`;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1}>{text}</Text>
      </View>
      <TouchableOpacity onPress={onCancel}>
        <AntDesign name="closecircleo" size={20} color={COLORS.secondary} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.extraLightGrey,
    padding: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftColor: COLORS.secondary,
    borderLeftWidth: 6,
  },
  textContainer: {
    flex: 1,
    marginRight: horizontalScale(5),
  },
  name: {
    color: COLORS.secondary,
    fontFamily: Fonts.medium,
    letterSpacing: 0.3,
  },
});

//make this component available to the app
export default ReplyTo;
