//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomInput from '../CustomInput';
import Feather from 'react-native-vector-icons/Feather';
import SubmitButton from '../SubmitButton';
import {verticalScale} from '../../Theme/Dimentions';
import {
  validateEmail,
  validatePassword,
} from '../../Utils/ValidationConstraints';
import {validateInput} from '../../Utils/Action/FormAction';
// create a component
const SignInForm = () => {
  const inputChangedHandler = (inputId, inputValue) => {
    console.log(validateInput(inputId, inputValue));
  };
  return (
    <>
      <CustomInput
        id="email"
        label="Email"
        icon={'mail'}
        iconPack={Feather}
        keyboardType="email-address"
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        //   errorText={'Some Error Text'}
      />
      <CustomInput
        id="password"
        label="Password"
        icon={'lock'}
        iconPack={Feather}
        secureTextEntry
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        //   errorText={'Some Error Text'}
      />
      <SubmitButton
        // disabled={true}
        style={{marginTop: verticalScale(20)}}
        title="Sign in"
        onPress={() => {
          console.log('Button Pressed');
        }}
      />
    </>
  );
};

//make this component available to the app
export default SignInForm;
