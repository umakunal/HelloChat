//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomInput from '../../Components/CustomInput';
import PageContainer from '../../Components/PageContainer';
import SignInForm from '../../Components/SignInForm';
import SignUpForm from '../../Components/SignUpForm';
import {COLORS} from '../../Theme/Colors';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import {Fonts} from '../../Theme/Fonts';
import {ImagePath} from '../../Theme/ImagePath';
// create a component
const Auth = () => {
  const [IsSignUp, setIsSignUp] = useState(false);
  return (
    <SafeAreaView style={styles.container}>
      <PageContainer>
        <ScrollView showsVerticalScrollIndicator={false}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={100}
            style={styles.keyboardAvoidingView}>
            <View style={styles.imageContainer}>
              <Image source={ImagePath.splash} style={styles.logo} />
            </View>
            {IsSignUp ? <SignUpForm /> : <SignInForm />}
            <TouchableOpacity
              style={styles.linkContainer}
              onPress={() => setIsSignUp(prevState => !prevState)}>
              <Text style={styles.link}>{`Switch to ${
                IsSignUp ? 'Sign in' : 'Sign up'
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    marginTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: moderateScale(150),
    height: moderateScale(150),
    resizeMode: 'contain',
  },
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(15),
  },
  link: {
    color: COLORS.primary,
    letterSpacing: 0.3,
    fontFamily: Fonts.medium,
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
});

//make this component available to the app
export default Auth;
