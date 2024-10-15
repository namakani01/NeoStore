import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Entypo';

const AccountDetails = () => {
  const [secure1, setSecure1] = useState(false);
  const [secure2, setSecure2] = useState(false);
  const [secure3, setSecure3] = useState(false);

  return (
    <ScrollView style = {{flex : 1 , backgroundColor : 'white'}}>
      <View
        style={{
          marginHorizontal: 15,
          marginLeft: 50,
          backgroundColor: 'white',
          position: 'absolute',
          marginTop: 20,
          zIndex : 99,
        }}>
        <Text style = {{color : 'black' , fontSize  :18}}>    Password change    </Text>
      </View>

      <View
        style={{
          borderWidth: 3,
          height : 420,
          borderRadius : 10,
          borderColor: '#ccc',
          marginHorizontal: 15,
          marginTop: 35,
        }}>
        <Text style={{marginTop: 30 , marginLeft : 23,color : 'black' , fontWeight  :'400' , fontSize :15}}>Current password</Text>

        <View
          style={{
            borderWidth: 3,
            borderColor: '#ccc',
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 8,
            marginHorizontal : 20,
          }}>
          <TextInput
            secureTextEntry={secure1}
            style={{
              width: '78%',
            }}></TextInput>
          {secure1 === false ? (
            <TouchableOpacity
              onPress={() => setSecure1(!secure1)}
              style={{marginTop: 13, marginLeft: 25}}>
              <Icon name="eye" size={23} color="grey"></Icon>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setSecure1(!secure1)}
              style={{marginTop: 13, marginLeft: 25}}>
              <Icon1 name="eye-with-line" size={23} color="grey"></Icon1>
            </TouchableOpacity>
          )}
        </View>

        <Text style={{marginTop: 15,marginLeft : 23,color : 'black' , fontWeight  :'400' , fontSize :15}}>New password</Text>
        <View
          style={{
            borderWidth: 3,
            borderColor: '#ccc',
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 8,
            marginHorizontal : 20
          }}>
          <TextInput
            secureTextEntry={false}
            style={{
              width: '78%',
            }}></TextInput>
          {secure2 === false ? (
            <TouchableOpacity
              onPress={() => setSecure2(!secure2)}
              style={{marginTop: 13, marginLeft: 25}}>
              <Icon name="eye" size={23} color="grey"></Icon>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setSecure2(!secure2)}
              style={{marginTop: 13, marginLeft: 25}}>
              <Icon1 name="eye-with-line" size={23} color="grey"></Icon1>
            </TouchableOpacity>
          )}
        </View>

        <Text style={{marginTop: 15,marginLeft : 23,color : 'black' , fontWeight  :'400' , fontSize :15}}>Confirm new password</Text>
        <View
          style={{
            borderWidth: 3,
            borderColor: '#ccc',
            flexDirection: 'row',
            marginTop: 10,
            borderRadius: 8,
            marginHorizontal : 20
          }}>
          <TextInput
            secureTextEntry={false}
            style={{
              width: '78%',
            }}></TextInput>
          {secure3 === false ? (
            <TouchableOpacity
              onPress={() => setSecure3(!secure3)}
              style={{marginTop: 13, marginLeft: 25}}>
              <Icon name="eye" size={23} color="grey"></Icon>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setSecure3(!secure3)}
              style={{marginTop: 13, marginLeft: 25}}>
              <Icon1 name="eye-with-line" size={23} color="grey"></Icon1>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: '#2E6BC6',
            marginTop: 30,
            marginHorizontal: 110,
            borderRadius: 10,
            padding: 6,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              color: 'white',
              fontFamily: 'RobotoMono-SemiBold',
              padding: 4,
            }}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AccountDetails;
