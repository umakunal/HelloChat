import {Platform, PermissionsAndroid} from 'react-native';
import * as ImagePicker from 'react-native-image-crop-picker';
import {getFirebaseApp} from './FirebaseHelper';
import uuid from 'react-native-uuid';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

export const launchImagePicker = async () => {
  await checkMediaPermission();
  const result = await ImagePicker.openPicker({
    path: 'my-file-path.jpg',
    width: 300,
    height: 400,
    compressImageQuality: 0.8,
  }).then(image => {
    console.log('Selected Image===>', image);
    return image;
  });
  return result.path;
};
export const openCamera = async () => {
  await checkMediaPermission();
  const result = await ImagePicker.openCamera({
    path: 'my-file-path.jpg',
    width: 300,
    height: 400,
    compressImageQuality: 0.8,
  }).then(image => {
    console.log('Selected Image===>', image);
    return image;
  });
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

export const uploadImageAsync = async (uri, isChatImage = false) => {
  // console.log('Image uri', uri);
  let Imageuri = uri;
  const filename = Imageuri.substring(Imageuri.lastIndexOf('/') + 1);
  const uploadUri =
    Platform.OS === 'ios' ? Imageuri.replace('file://', '') : Imageuri;

  // return;
  const app = getFirebaseApp();
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log('Error occured while uploading image to firebase==>', e);
      reject(new TypeError('Network request failed.'));
    };

    xhr.responseType = 'blob';
    xhr.open('GET', Imageuri, true);
    xhr.send(null);
  });
  const pathFolder = isChatImage ? `chatImages` : 'profilePics';
  const StorageRef = ref(getStorage(app), `${pathFolder}/${uuid.v4()}`);
  await uploadBytesResumable(StorageRef, blob);
  blob.close();
  return await getDownloadURL(StorageRef);
};
