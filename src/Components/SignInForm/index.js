//import liraries
import React, {Component, useCallback, useReducer} from 'react';
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
import {reducer} from '../../Utils/Reducer/FormReducer';
// create a component
const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};
const SignInForm = () => {
  const [FormState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({inputId, validationResult: result});
    },
    [dispatchFormState],
  );
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
        errorText={FormState.inputValidities['email']}
      />
      <CustomInput
        id="password"
        label="Password"
        icon={'lock'}
        iconPack={Feather}
        secureTextEntry
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
          errorText={FormState.inputValidities['password']}
      />
      <SubmitButton
        disabled={!FormState.formIsValid}
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
