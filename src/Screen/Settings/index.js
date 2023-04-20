//import liraries
import React, {Component, useCallback, useReducer, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import PageTitle from '../../Components/PageTitle';
import PageContainer from '../../Components/PageContainer';
import CustomInput from '../../Components/CustomInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {reducer} from '../../Utils/Reducer/FormReducer';
import {validateInput} from '../../Utils/Action/FormAction';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../Theme/Colors';
import {verticalScale} from '../../Theme/Dimentions';
import SubmitButton from '../../Components/SubmitButton';
import {
  updateSignedInUserData,
  userLogout,
} from '../../Utils/Action/AuthActions';
import {updateLoggrdInUserData} from '../../store/authSlice';

// create a component
const Settings = () => {
  const userData = useSelector(state => state.auth.userData);
  console.log('userData', userData);
  const [Loading, setLoading] = useState(false);
  const [ShowSuccessMessage, setShowSuccessMessage] = useState(false);
  const initialState = {
    inputValues: {
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      about: userData.about || '',
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: false,
  };
  const dispatch = useDispatch();
  const [FormState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({inputId, validationResult: result, inputValue});
    },
    [dispatchFormState],
  );
  const SaveHandler = async () => {
    const updatedValues = FormState.inputValues;
    try {
      setLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);
      dispatch(updateLoggrdInUserData({newData: updatedValues}));
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log('error occured while updating userDetails', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer style={styles.container}>
      <PageTitle title="Settings" />
      <CustomInput
        id="firstName"
        initialValue={userData.firstName}
        label="First name"
        icon={'user-o'}
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={FormState?.inputValidities['firstName']}
      />
      <CustomInput
        id="lastName"
        initialValue={userData.lastName}
        label="Last name"
        icon={'user-o'}
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={FormState?.inputValidities['lastName']}
      />
      <CustomInput
        id="email"
        initialValue={userData.email}
        label="Email"
        icon={'mail'}
        iconPack={Feather}
        keyboardType="email-address"
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={FormState?.inputValidities['email']}
      />
      <CustomInput
        id="about"
        label="About"
        initialValue={userData.about}
        icon={'user-o'}
        iconPack={FontAwesome}
        autoCapitalize="none"
        onInputChanged={inputChangedHandler}
        errorText={FormState?.inputValidities['about']}
      />
      <View style={{marginTop: verticalScale(20)}}>
        {ShowSuccessMessage && <Text>Saved!!!</Text>}

        {Loading ? (
          <ActivityIndicator
            size={'small'}
            color={COLORS.primary}
            style={{marginTop: verticalScale(10)}}
          />
        ) : (
          <SubmitButton
            disabled={!FormState?.formIsValid}
            style={{marginTop: verticalScale(20)}}
            title="Save"
            onPress={() => {
              SaveHandler();
            }}
          />
        )}
      </View>
      <SubmitButton
        color={COLORS.red2}
        style={{marginTop: verticalScale(20)}}
        title="Logout"
        onPress={() => {
          dispatch(userLogout());
        }}
      />
    </PageContainer>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Settings;
