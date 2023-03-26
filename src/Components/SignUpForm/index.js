//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SubmitButton from '../SubmitButton';
import { verticalScale } from '../../Theme/Dimentions';
// create a component
const SignUpForm = () => {
  return (
    <>
      <CustomInput
        label="First name"
        icon={'user-o'}
        iconPack={FontAwesome}
        //   errorText={'Some Error Text'}
      />
      <CustomInput
        label="Last name"
        icon={'user-o'}
        iconPack={FontAwesome}
        //   errorText={'Some Error Text'}
      />
      <CustomInput
        label="Email"
        icon={'mail'}
        iconPack={Feather}
        //   errorText={'Some Error Text'}
      />
      <CustomInput
        label="Password"
        icon={'lock'}
        iconPack={Feather}
        //   errorText={'Some Error Text'}
      />
      <SubmitButton
        // disabled={true}
        style={{marginTop: verticalScale(20)}}
        title="Sign up"
        onPress={() => {
          console.log('Button Pressed');
        }}
      />
    </>
  );
};

//make this component available to the app
export default SignUpForm;
