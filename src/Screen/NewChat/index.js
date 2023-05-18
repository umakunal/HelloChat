import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../Components/CustomHeaderButton';
import PageContainer from '../../Components/PageContainer';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../Theme/Colors';
import {
  fullWidth,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../Theme/Dimentions';
import CommonStyle from '../../Constants/CommonStyle';
import {Fonts} from '../../Theme/Fonts';
import {searchUser} from '../../Utils/Action/userAction';
import DataItem from '../../Components/DataItem';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenName} from '../../Constants/ScreenName';
import {setStoredUsers} from '../../store/userSlice';

const NewChatScreen = props => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.userData);
  const [Loading, setLoading] = useState(false);
  const [Users, setUsers] = useState();
  const [SearchTerm, setSearchTerm] = useState('');
  const [NoResultFound, setNoResultFound] = useState(false);
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => {
        return (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Close" onPress={() => props.navigation.goBack()} />
          </HeaderButtons>
        );
      },
      headerTitle: 'New chat',
    });
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(async () => {
      if (!SearchTerm || SearchTerm === '') {
        setUsers();
        setNoResultFound(false);
        return;
      }
      setLoading(true);
      const userResult = await searchUser(SearchTerm);
      delete userResult[userData.userId];
      console.log('userResult===>', userResult);
      setUsers(userResult);
      if (Object.keys(userResult).length === 0) {
        setNoResultFound(true);
      } else {
        setNoResultFound(false);
        dispatch(setStoredUsers({newUsers: userResult}));
      }
      setLoading(false);
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [SearchTerm]);

  const userPressed = userId => {
    props.navigation.navigate(ScreenName.chatList, {selectedUserId: userId});
  };

  return (
    <PageContainer>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={15} color={COLORS.lightGrey} />
        <TextInput
          value={SearchTerm}
          placeholder="Search"
          style={styles.searchBox}
          onChangeText={val => {
            setSearchTerm(val);
          }}
        />
      </View>

      {Loading && (
        <View style={CommonStyle.center}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      )}
      {!Loading && !NoResultFound && Users && (
        <FlatList
          data={Object.keys(Users)}
          renderItem={itemData => {
            const userId = itemData.item;
            const userData = Users[userId];

            console.log('userId', userId);
            console.log('userData', userData);
            // console.log('userData Image', userData.profilePicture);
            return (
              <DataItem
                title={userData.firstName + ' ' + userData.lastName}
                subTitle={userData.about}
                image={userData.profilePicture}
                onPress={() => userPressed(userId)}
              />
            );
          }}
        />
      )}
      {!Loading && NoResultFound && (
        <View style={CommonStyle.center}>
          <FontAwesome
            name="question"
            size={55}
            color={COLORS.lightGrey}
            style={styles.NoResultIcon}
          />
          <Text style={styles.NoResultText}>No user found!</Text>
        </View>
      )}
      {!Loading && !Users && (
        <View style={CommonStyle.center}>
          <FontAwesome
            name="users"
            size={55}
            color={COLORS.lightGrey}
            style={styles.NoResultIcon}
          />
          <Text style={styles.NoResultText}>
            Enter a name to serch for a user!
          </Text>
        </View>
      )}
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.extraLightGrey,
    // height: verticalScale(30),
    marginVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(8),
    // paddingVertical: verticalScale(2),
    borderRadius: moderateScale(5),
  },
  searchBox: {
    marginLeft: horizontalScale(5),
    fontSize: 15,
    width: fullWidth,
  },
  NoResultIcon: {
    marginBottom: verticalScale(20),
  },
  NoResultText: {
    color: COLORS.textColor,
    fontFamily: Fonts.regular,
    letterSpacing: 0.3,
  },
});

export default NewChatScreen;
