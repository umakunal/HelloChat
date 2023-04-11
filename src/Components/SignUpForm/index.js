//import liraries
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import CustomInput from '../CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import SubmitButton from '../SubmitButton';
import {verticalScale} from '../../Theme/Dimentions';
import {validateInput} from '../../Utils/Action/FormAction';
import {reducer} from '../../Utils/Reducer/FormReducer';
import {signUp} from '../../Utils/Action/AuthActions';
import {COLORS} from '../../Theme/Colors';
import {useDispatch, useSelector} from 'react-redux';

// create a component
const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};
const SignUpForm = () => {
  const dispatch = useDispatch();
  const [Error, setError] = useState('');
  const [Loading, setLoading] = useState(false);
  const [FormState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({inputId, validationResult: result, inputValue});
    },
    [dispatchFormState],
  );

  useEffect(() => {
    if (Error) {
      Alert.alert('An error occured', Error, [{text: 'Okay'}]);
    }
  }, [Error]);

  const AuthHandler = async () => {
    try {
      setLoading(true);
      const action = signUp(
        FormState.inputValues.firstName,
        FormState.inputValues.lastName,
        FormState.inputValues.email,
        FormState.inputValues.password,
      );
      dispatch(action);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <CustomInput
        id="firstName"
        label="First name"
        icon={'user-o'}
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={FormState.inputValidities['firstName']}
      />
      <CustomInput
        id="lastName"
        label="Last name"
        icon={'user-o'}
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={FormState.inputValidities['lastName']}
      />
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
        autoCapitalize="none"
        secureTextEntry
        onInputChanged={inputChangedHandler}
        errorText={FormState.inputValidities['password']}
      />
      {Loading ? (
        <ActivityIndicator
          size={'small'}
          color={COLORS.primary}
          style={{marginTop: verticalScale(10)}}
        />
      ) : (
        <SubmitButton
          disabled={!FormState.formIsValid}
          style={{marginTop: verticalScale(20)}}
          title="Sign up"
          onPress={() => {
            AuthHandler();
          }}
        />
      )}
    </>
  );
};

//make this component available to the app
export default SignUpForm;
