import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Feather'


import EncryptedStorage from 'react-native-encrypted-storage';

import axios from 'axios';

const UserprofileScreen = (props) => {
  const [isOrdersFocused, setIsOrdersFocused] = useState(false);
  const [isUpdateDetailsFocused , setIsUpdateDetailsFocused] = useState(false)
  const [isAccountDetailsFocused, setIsAccountDetailsFocused] = useState(false);
  const [isLogoutFocused, setIsLogoutFocused] = useState(false);
  const [Username, setUsername] = useState(null);

  async function FetchUserDetails() {
    try {
      const accessToken = await EncryptedStorage.getItem('access_token');
      console.log('Retrieved Token:', accessToken);

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
        console.log(result.data);
        const userData = result.data.data?.user_data;
        setUsername(userData.username);
      } else {
        Alert.alert('No token found, please log in again.');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
    }
  }

  //   useEffect(()=>
  // {
  //     FetchUserDetails()
  // },[])
  return (
    <SafeAreaView>
      <View style={{marginHorizontal : 10}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontSize: 16, marginTop: 15}}>Hello {Username}</Text>
          <Text style={{fontSize: 15, marginTop: 15}}>
            From your account dashboard you can view your recent orders, manage
            your shipping and billing addresses, and edit your password and
            account details.
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              height: 120,
              width: 270,
              marginTop: 30,
              alignSelf: 'center',
              borderRadius: 12,
              backgroundColor: '#f8f8f8',
              borderColor: '#ddd',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
            }}
            onPressIn={() => setIsOrdersFocused(true)}
            onPressOut={() => setIsOrdersFocused(false)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'column',
              }}>
              <Icon
                name="file-text"
                size={42}
                color={isOrdersFocused ? '#2E6BC6' : 'grey'}
              />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
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
              height: 120,
              width: 270,
              marginTop: 30,
              alignSelf: 'center',
              borderRadius: 12,
              backgroundColor: '#f8f8f8',
              borderColor: '#ddd',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
            }}
            onPress={()=>props.navigation.navigate('UpdateDetails')}
            onPressIn={() => setIsUpdateDetailsFocused(true)}
            onPressOut={() => setIsUpdateDetailsFocused(false)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'column',
              }}>
              <Icon3
                name="edit"
                size={42}
                color={isUpdateDetailsFocused ? '#2E6BC6' : 'grey'}
              />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
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
              height: 120,
              width: 270,
              marginTop: 30,
              alignSelf: 'center',
              borderRadius: 12,
              backgroundColor: '#f8f8f8',
              borderColor: '#ddd',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
            }}
            onPress={()=>props.navigation.navigate('AccountDetails')}
            onPressIn={() => setIsAccountDetailsFocused(true)}
            onPressOut={() => setIsAccountDetailsFocused(false)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'column',
              }}>
              <Icon2
                name="person-circle-outline"
                size={42}
                color={isAccountDetailsFocused ? '#2E6BC6' : 'grey'}
              />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: 'black',
                }}>
                Account Details
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              borderWidth: 1,
              height: 120,
              width: 270,
              marginTop: 30,
              alignSelf: 'center',
              borderRadius: 12,
              backgroundColor: '#f8f8f8',
              borderColor: '#ddd',
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 5,
              elevation: 4,
            }}
            onPressIn={() => setIsLogoutFocused(true)}
            onPressOut={() => setIsLogoutFocused(false)}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                flexDirection: 'column',
              }}>
              <Icon1
                name="logout"
                size={42}
                color={isLogoutFocused ? '#2E6BC6' : 'grey'}
              />
              <Text
                style={{
                  marginTop: 12,
                  fontSize: 16,
                  fontWeight: 'normal',
                  color: 'black',
                }}>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserprofileScreen;
