//import liraries
import React, {
  Component,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import {View, Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
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
import {signIn} from '../../Utils/Action/AuthActions';
import {useDispatch} from 'react-redux';
import {COLORS} from '../../Theme/Colors';
// create a component
const isTestMode = true;
const initialState = {
  inputValues: {
    email: isTestMode ? 'samratkunal@mail.com' : '',
    password: isTestMode ? '123456' : '',
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
};
const SignInForm = () => {
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

  const AuthHandler = useCallback(async () => {
    try {
      setLoading(true);
      const action = signIn(
        FormState.inputValues.email,
        FormState.inputValues.password,
      );
      setError('');
      await dispatch(action);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, [dispatch, FormState]);

  return (
    <>
      <CustomInput
        id="email"
        label="Email"
        icon={'mail'}
        iconPack={Feather}
        keyboardType="email-address"
        autoCapitalize="none"
        value={FormState.inputValues.email}
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
        value={FormState.inputValues.password}
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
          title="Sign in"
          onPress={AuthHandler}
        />
      )}
    </>
  );
};

//make this component available to the app
export default SignInForm;
