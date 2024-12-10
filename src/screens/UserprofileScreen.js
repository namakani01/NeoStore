import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../assests/styles/Metrics';

const UserprofileScreen = props => {
  const [isOrdersFocused, setIsOrdersFocused] = useState(false);
  const [isUpdateDetailsFocused, setIsUpdateDetailsFocused] = useState(false);
  const [isAccountDetailsFocused, setIsAccountDetailsFocused] = useState(false);
  const [isLogoutFocused, setIsLogoutFocused] = useState(false);
  const [Username, setUsername] = useState(null);

  const [openmodal, setopenmodal] = useState(false);

  async function FetchUserDetails() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      // console.log('Retrieved Token:', accessToken);

      if (accessToken) {
        let result = await axios.get(
          'http://staging.php-dev.in:8844/trainingapp/api/users/getUserData',
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              access_token: accessToken,
            },
          },
        );
        // console.log(result.data);
        const userData = result.data.data?.user_data;
        setUsername(userData.username);
      } else {
        Alert.alert('No token found, please log in again.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  useEffect(() => {
    FetchUserDetails();
  }, []);

  async function Logout() {
    try {
      await EncryptedStorage.removeItem('access_token');
      setopenmodal(false);
      props.navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <SafeAreaView>
        <View style={{marginHorizontal: horizontalScale(10)}}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={{
                fontSize: moderateScale(15),
                marginTop: verticalScale(12),
                color: 'black',
              }}>
              Hello {Username}
            </Text>
            <Text
              style={{
                fontSize: moderateScale(14),
                marginTop: verticalScale(10),
                color: 'black',
              }}>
              From your account dashboard you can view your recent orders,
              manage your shipping and billing addresses, and edit your password
              and account details.
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginTop: verticalScale(10),
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: verticalScale(107),
                width: horizontalScale(215),
                marginTop: verticalScale(20),
                marginBottom: verticalScale(10),
                alignSelf: 'center',
                borderRadius: moderateScale(12),
                backgroundColor: 'white',
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 4,
              }}
              onPress={() => props.navigation.navigate('myorders')}
              onPressIn={() => setIsOrdersFocused(true)}
              onPressOut={() => setIsOrdersFocused(false)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(15),
                  flexDirection: 'column',
                }}>
                <Icon
                  name="file-text"
                  size={36.8}
                  color={isOrdersFocused ? '#2E6BC6' : 'grey'}
                />
                <Text
                  style={{
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(15),
                    fontWeight: 'normal',
                    color: 'black',
                  }}>
                  Orders
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: verticalScale(110),
                width: horizontalScale(220),
                marginTop: verticalScale(20),
                marginBottom: verticalScale(10),
                alignSelf: 'center',
                borderRadius: moderateScale(12),
                backgroundColor: 'white',
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 4,
              }}
              onPress={() => props.navigation.navigate('UpdateDetails')}
              onPressIn={() => setIsUpdateDetailsFocused(true)}
              onPressOut={() => setIsUpdateDetailsFocused(false)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(15),
                  flexDirection: 'column',
                }}>
                <Icon3
                  name="edit"
                  size={36.8}
                  color={isUpdateDetailsFocused ? '#2E6BC6' : 'grey'}
                />
                <Text
                  style={{
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(15),
                    fontWeight: 'normal',
                    color: 'black',
                  }}>
                  Update Details
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: verticalScale(110),
                width: horizontalScale(220),
                marginTop: verticalScale(20),
                marginBottom: verticalScale(10),
                alignSelf: 'center',
                borderRadius: moderateScale(12),
                backgroundColor: 'white',
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 4,
              }}
              onPress={() => props.navigation.navigate('ChangePassword')}
              onPressIn={() => setIsAccountDetailsFocused(true)}
              onPressOut={() => setIsAccountDetailsFocused(false)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(15),
                  flexDirection: 'column',
                }}>
                <Icon2
                  name="sync"
                  size={36.8}
                  color={isAccountDetailsFocused ? '#2E6BC6' : 'grey'}
                />
                <Text
                  style={{
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(15),
                    fontWeight: 'normal',
                    color: 'black',
                  }}>
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                height: verticalScale(110),
                width: horizontalScale(220),
                marginTop: verticalScale(20),
                alignSelf: 'center',
                borderRadius: moderateScale(12),
                backgroundColor: 'white',
                borderColor: '#ddd',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.1,
                shadowRadius: 5,
                elevation: 4,
              }}
              onPress={() => setopenmodal(true)}
              onPressIn={() => setIsLogoutFocused(true)}
              onPressOut={() => setIsLogoutFocused(false)}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: verticalScale(15),
                  flexDirection: 'column',
                }}>
                <Icon1
                  name="logout"
                  size={36.8}
                  color={isLogoutFocused ? '#2E6BC6' : 'grey'}
                />
                <Text
                  style={{
                    marginTop: verticalScale(15),
                    fontSize: moderateScale(15),
                    fontWeight: 'normal',
                    color: 'black',
                  }}>
                  Logout
                </Text>
              </View>
            </TouchableOpacity>

            <Modal visible={openmodal} transparent={true}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  marginVertical: verticalScale(303),
                  marginHorizontal: horizontalScale(40),
                  borderRadius: moderateScale(10),
                  borderWidth: 2,
                  borderColor: '#cccc',
                  elevation: 5,
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: verticalScale(10),
                    fontSize: moderateScale(18),
                    marginBottom: verticalScale(40),
                    color: 'black',
                  }}>
                  Are you sure?
                </Text>

                <View
                  style={{
                    width: horizontalScale(220),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    onPress={() => setopenmodal(false)}
                    style={{
                      backgroundColor: 'grey',
                      padding: horizontalScale(4),
                      borderRadius: moderateScale(8),
                    }}>
                    <Text
                      style={{
                        fontSize: moderateScale(14.8),
                        padding: horizontalScale(4),
                        color: 'white',
                        fontWeight: 500,
                      }}>
                      Close
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => Logout()}
                    style={{
                      backgroundColor: '#2E6BC6',
                      padding: horizontalScale(4),
                      borderRadius: moderateScale(8),
                    }}>
                    <Text
                      style={{
                        fontSize: moderateScale(14.8),
                        padding: horizontalScale(4),
                        color: 'white',
                        fontWeight: 500,
                      }}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserprofileScreen;
