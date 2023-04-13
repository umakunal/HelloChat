//import liraries
import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {COLORS} from '../../Theme/Colors';
import CommonStyle from '../../Constants/CommonStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {async} from 'validate.js';
import {useDispatch} from 'react-redux';
import {setDidTryAutoLogin} from '../../store/authSlice';

// create a component
const StartUp = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const storedAuthInfo = await AsyncStorage.getItem('userData');

      if (!storedAuthInfo) {
        console.log('No Storage found');
        dispatch(setDidTryAutoLogin());
        return;
      }
    };
    tryLogin();
  }, []);

  return (
    <View style={CommonStyle.center}>
      <ActivityIndicator size={'large'} color={COLORS.primary} />
    </View>
  );
};

//make this component available to the app
export default StartUp;
