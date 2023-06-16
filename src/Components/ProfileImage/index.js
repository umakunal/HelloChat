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
import AntDesign from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../Theme/Colors';
import {
  launchImagePicker,
  uploadImageAsync,
} from '../../Utils/ImagePickerHelper';
import {useState} from 'react';
import {updateSignedInUserData} from '../../Utils/Action/AuthActions';
import {useDispatch} from 'react-redux';
import {updateLoggrdInUserData} from '../../store/authSlice';

const ProfileImage = props => {
  const dispatch = useDispatch();

  const source = props.uri ? {uri: props.uri} : ImagePath.emptyImage;

  const [image, setImage] = useState(source);
  const [isLoading, setIsLoading] = useState(false);
  const showEditButton = props.showEditButton && props.showEditButton === true;
  const showRemoveButton =
    props.showRemoveButton && props.showRemoveButton === true;

  const userId = props.userId;

  const pickImage = async () => {
    try {
      const tempUri = await launchImagePicker();

      if (!tempUri) return;

      // Upload the image
      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(tempUri);
      setIsLoading(false);

      if (!uploadUrl) {
        throw new Error('Could not upload image');
      }

      const newData = {profilePicture: uploadUrl};

      await updateSignedInUserData(userId, newData);
      dispatch(updateLoggrdInUserData({newData}));

      setImage({uri: uploadUrl});
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const Container = props.onPress || showEditButton ? TouchableOpacity : View;

  return (
    <Container style={props.style} onPress={props.onPress || pickImage}>
      {isLoading ? (
        <View
          height={props.size}
          width={props.size}
          style={styles.loadingContainer}>
          <ActivityIndicator size={'small'} color={COLORS.primary} />
        </View>
      ) : (
        <Image
          style={{...styles.image, ...{width: props.size, height: props.size}}}
          source={image}
        />
      )}

      {showEditButton && !isLoading && (
        <View style={styles.editIconContainer}>
          <Entypo name="edit" size={18} color={COLORS.primary} />
        </View>
      )}
      {showRemoveButton && !isLoading && (
        <View style={styles.removeIconContainer}>
          <AntDesign name="close" size={15} color={COLORS.black} />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  image: {
    borderRadius: 50,
    borderColor: COLORS.grey,
    borderWidth: 1,
    marginVertical: verticalScale(10),
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    padding: 8,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeIconContainer: {
    position: 'absolute',
    bottom: -3,
    right: -3,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 20,
    padding: 3
},
});

export default ProfileImage;
