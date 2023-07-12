//import liraries
import React, {Component, useCallback, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import PageContainer from '../../Components/PageContainer';
import PageTitle from '../../Components/PageTitle';
import ProfileImage from '../../Components/ProfileImage';
import CustomInput from '../../Components/CustomInput';
import {reducer} from '../../Utils/Reducer/FormReducer';
import {validateLength} from '../../Utils/ValidationConstraints';
import {updateChatData} from '../../Utils/Action/ChatAction';
import {COLORS} from '../../Theme/Colors';
import SubmitButton from '../../Components/SubmitButton';
import {validateInput} from '../../Utils/Action/FormAction';
import {fullWidth, moderateScale, verticalScale} from '../../Theme/Dimentions';
import {Fonts} from '../../Theme/Fonts';
import DataItem from '../../Components/DataItem';
import {ScreenName} from '../../Constants/ScreenName';

// create a component
const ChatSettings = props => {
  const [Loading, setLoading] = useState(false);
  const [ShowSuccessMessage, setShowSuccessMessage] = useState(false);
  const chatId = props.route.params.chatId;
  const chatData = useSelector(state => state.chats.chatsData[chatId]);
  const userData = useSelector(state => state.auth.userData);
  const storedUsers = useSelector(state => state.users.storedUsers);

  const initialState = {
    inputValues: {chatName: chatData.chatName},
    inputValidities: {chatName: undefined},
    formIsValid: false,
  };
  //   const dispatch = useDispatch();
  const [FormState, dispatchFormState] = useReducer(reducer, initialState);
  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({inputId, validationResult: result, inputValue});
    },
    [dispatchFormState],
  );
  const SaveHandler = useCallback(async () => {
    const updatedValues = FormState.inputValues;
    try {
      setLoading(true);
      await updateChatData(chatId, userData.userId, updatedValues);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log('error occured while updating userDetails', error);
    } finally {
      setLoading(false);
    }
  }, [FormState]);
  const hasChanges = () => {
    const currentValues = FormState.inputValues;
    return currentValues.chatName != chatData.chatName;
  };
  return (
    <PageContainer>
      <PageTitle title="Chat Settings" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <ProfileImage
          uri={chatData?.chatImage}
          showEditButton={true}
          chatId={chatId}
          userId={userData.userId}
          size={80}
        />
        <CustomInput
          id="chatName"
          label=" Chat name"
          autoCapitalize="none"
          initialValue={chatData?.chatName}
          allowEmpty={false}
          onInputChanged={inputChangedHandler}
          errorText={FormState?.inputValidities['chatName']}
        />

        <View style={styles.sectionContainer}>
          <Text style={styles.heading}>
            {chatData.users.length} Participants
          </Text>
          <DataItem title="Add users" icon="plus" type="button" />
          {chatData.users.map(uid => {
            const currentUser = storedUsers[uid];
            console.log('currentUser', currentUser);
            return (
              <DataItem
                key={uid}
                image={currentUser.profilePicture}
                title={`${currentUser.firstName} ${currentUser.lastName}`}
                subTitle={
                  currentUser.about == undefined ? '' : `${currentUser.about}`
                }
                type={uid !== userData.userId && 'link'}
                onPress={() =>
                  uid !== userData.userId &&
                  props.navigation.navigate(ScreenName.contact, {uid})
                }
              />
            );
          })}
        </View>

        {ShowSuccessMessage && <Text style={styles.saved}>Saved!</Text>}
        {Loading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : (
          hasChanges() && (
            <SubmitButton
              onPress={SaveHandler}
              title="Save Changes"
              color={COLORS.primary}
              disabled={!FormState.formIsValid}
              style={{marginTop: verticalScale(20)}}
            />
          )
        )}
      </ScrollView>
    </PageContainer>
  );
};

// define your styles
const styles = StyleSheet.create({
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  saved: {
    color: COLORS.green,
    textAlign: 'center',
    fontSize: moderateScale(16),
    marginTop: verticalScale(20),
    fontFamily: Fonts.medium,
  },
  sectionContainer: {
    width: fullWidth * 0.9,
    marginTop: verticalScale(10),
  },
  heading: {
    fontFamily: Fonts.bold,
    letterSpacing: 0.3,
    color: COLORS.textColor,
    marginVertical: verticalScale(8),
  },
});

//make this component available to the app
export default ChatSettings;
