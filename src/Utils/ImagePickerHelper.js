import {Platform, PermissionsAndroid} from 'react-native';
import * as ImagePicker from 'react-native-image-crop-picker';

export const launchImagePicker = async () => {
  await checkMediaPermission();
  const result = await ImagePicker.openPicker({
    path: 'my-file-path.jpg',
    width: 300,
    height: 400,
    compressImageQuality: 0.8,
  }).then(image => {
    return image;
  });
  console.log('Selected Image===>', result);
  return result.path;
};

const checkMediaPermission = async () => {
  if (Platform.OS === 'android') {
    const permissionResult = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera Permission',
        message: 'App needs camera permission',
      },
      PermissionsAndroid.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs storage permission',
      },
    );
    console.log('permissionResult', permissionResult);
    // return permissionResult === PermissionsAndroid.RESULTS.GRANTED;
    if (permissionResult === PermissionsAndroid.RESULTS.GRANTED) {
      Promise.resolve();
    } else {
      return Promise.reject();
    }
  }
};
