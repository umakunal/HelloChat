//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ImagePath} from '../../Theme/ImagePath';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../Theme/Colors';
import {
  launchImagePicker,
  uploadImageAsync,
} from '../../Utils/ImagePickerHelper';
import {useState} from 'react';
import {updateSignedInUserData} from '../../Utils/Action/AuthActions';
import {useDispatch} from 'react-redux';
import {updateLoggrdInUserData} from '../../store/authSlice';
// create a component
const ProfileImage = props => {
  const dispatch = useDispatch();
  const source = props.uri ? {uri: props.uri} : ImagePath.emptyImage;
  const [ImageData, setImageData] = useState(source);
  const [IsLoading, setIsLoading] = useState(false);
  const userId = props.userId;

  console.log('userID', userId);
  const pickImage = async () => {
    setIsLoading(true);
    try {
      const tempUri = await launchImagePicker();
      console.log('tempUri', tempUri);
      if (!tempUri) return;
      //Upload the Image
      const uploadUrl = await uploadImageAsync(tempUri);

      if (!uploadUrl || uploadUrl == undefined) {
        throw new Error('Could not upload image!!!');
      }
      const newData = {profilePicture: uploadUrl};
      await updateSignedInUserData(userId, newData);
      dispatch(updateLoggrdInUserData({newData}));
      setImageData({uri: uploadUrl});
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('error fetching image', error);
    }
  };
  return (
    <View style={styles.container}>
      {IsLoading ? (
        <View
          style={[
            styles.loderView,
            {height: props.height, width: props.width},
          ]}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <Image
          source={ImageData}
          style={{
            ...styles.profilePic,
            ...{
              height: props.height,
              width: props.width,
              borderRadius: props.borderRadius,
            },
          }}
        />
      )}
      <TouchableOpacity  onPress={pickImage} style={styles.edit}>
        <Entypo name="edit" size={18} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: verticalScale(10),
  },
  profilePic: {
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: COLORS.lightGrey,
  },
  edit: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(20),
    padding: moderateScale(8),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  loderView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default ProfileImage;
