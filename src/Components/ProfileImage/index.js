//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ImagePath} from '../../Theme/ImagePath';
import {moderateScale, verticalScale} from '../../Theme/Dimentions';
import Entypo from 'react-native-vector-icons/Entypo';
import {COLORS} from '../../Theme/Colors';
import {launchImagePicker} from '../../Utils/ImagePickerHelper';
import {useState} from 'react';
// create a component
const ProfileImage = props => {
  const source = props.uri ? {uri: props.uri} : ImagePath.emptyImage;
  const [ImageData, setImageData] = useState(source);
  const pickImage = async () => {
    try {
      const tempUrl = await launchImagePicker();
      if (!tempUrl) return;

      //Upload the Image

      // Set the Image
      setImageData({uri:tempUrl})
    } catch (error) {
      console.log('error fetching image', error)
    }
  };
  return (
    <View style={styles.container}>
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
      <TouchableOpacity onPress={pickImage} style={styles.edit}>
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
});

//make this component available to the app
export default ProfileImage;
