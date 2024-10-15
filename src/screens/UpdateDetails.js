import {
  View,
  Text,
  ScrollView,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import DatePicker from 'react-native-date-picker';

import Icon1 from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/Fontisto';
import Icon5 from 'react-native-vector-icons/SimpleLineIcons';
import Icon6 from 'react-native-vector-icons/Fontisto';

const UpdateDetails = () => {
  const [image, setImage] = useState(
    'https://gratisography.com/wp-content/uploads/2024/03/gratisography-funflower-800x525.jpg',
  );
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [check, setCheck] = useState(false);

  const Picture = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };
  return (
    <ScrollView>
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
        }}>
        <Image
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            padding: 65,
            alignSelf: 'center',
          }}
          source={{uri: image}}></Image>

        <View style={{position: 'absolute', marginLeft: 210, marginTop: 80}}>
          <TouchableOpacity
            onPress={Picture}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              backgroundColor: 'white',
              alignSelf: 'center',
            }}>
            <Icon1
              style={{alignSelf: 'center', marginTop: 10}}
              name="camera"
              size={25}></Icon1>
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            color: 'black',
            marginTop: 10,
          }}>
          First Name
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
          }}>
          <Icon2
            style={{marginTop: 10, marginLeft: 5}}
            name="user"
            size={23}></Icon2>

          <TextInput
            style={{
              marginLeft: 7,
              height: 45,
              width: '85%',
            }}></TextInput>
        </View>

        <Text
          style={{
            fontSize: 15,
            fontWeight: '400',
            color: 'black',
            marginTop: 10,
          }}>
          Last Name
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
          }}>
          <Icon3
            style={{marginTop: 10, marginLeft: 6}}
            name="address-card"
            size={23}></Icon3>
          <TextInput
            style={{
              marginLeft: 7,
              height: 45,
              width: '85%',
              // borderWidth: 2,
            }}></TextInput>
        </View>

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: '400',
            color: 'black',
          }}>
          Email
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
          }}>
          <Icon4
            style={{marginTop: 10, marginLeft: 6}}
            name="email"
            size={23}></Icon4>

          <TextInput
            style={{
              marginLeft: 7,
              height: 45,
              width: '85%',
              // borderColor: 'red',
              // borderWidth: 2,
            }}></TextInput>
        </View>

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: '400',
            color: 'black',
          }}>
          Phone Number
        </Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            borderWidth: 3,
            borderRadius: 8,
            borderColor: '#ccc',
          }}>
          <Icon5
            style={{marginTop: 10, marginLeft: 6}}
            name={'phone'}
            size={24}
            color={'grey'}></Icon5>
          <TextInput
            keyboardType="numeric"
            style={{
              marginLeft: 7,
              height: 45,
              width: '85%',
              // borderColor: 'red',
              // borderWidth: 2,
            }}></TextInput>
        </View>

        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            fontWeight: '400',
            color: 'black',
          }}>
          Date of Birth
        </Text>
        <View
          style={{
            marginTop: 10,
            borderWidth: 3,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 12,
          }}>
          <TouchableOpacity onPress={() => setOpen(true)}>
            <View style={{flexDirection: 'row'}}>
              <Icon6 name="date" size={23} color={'grey'}></Icon6>
              <Text style = {{marginLeft : 20 , color : 'black' , fontWeight : '400'}}>
                {check
                  ? date.toISOString().split('T')[0]
                  : 'Select Date of Birth'}
              </Text>
            </View>
            <DatePicker
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);
                setDate(date);
                setCheck(true);
              }}
              onCancel={() => {
                setOpen(false);
              }}></DatePicker>
          </TouchableOpacity>
        </View>


        <TouchableOpacity style = {{backgroundColor : '#2E6BC6' , marginTop : 35, padding : 5 , marginHorizontal : 120 , borderRadius :  10}}>
          <Text style = {{color : 'white',textAlign : 'center' , padding : 5 , fontSize : 16 , fontFamily : 'RobotoMono-SemiBold'}}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default UpdateDetails;
