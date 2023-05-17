//import liraries
import React, {Component} from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import {COLORS} from '../../Theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={props.color ?? COLORS.primary}
    />
  );
};


//make this component available to the app
export default CustomHeaderButton;
