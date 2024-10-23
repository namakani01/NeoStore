import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/Feather';
import React, {useState} from 'react';
import {RadioButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {deleteAddress} from '../redux/reducer';

const AddressScreen = props => {
  // console.log('Props', props.route.params.total);

  const [checked, setChecked] = useState();
  const dispatch = useDispatch();

  console.log(checked);

  const data = useSelector(state => state);
  // console.log('data is', data);

  const handledelete = id => {
    dispatch(deleteAddress(id));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {data.address.length === 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 17, color: 'gray'}}>
            Your Address List is Empty
          </Text>
          <Text style={{fontSize: 17, color: 'gray', marginTop: 10}}>
            Please add a Address by clicking the + button.
          </Text>
          <Image
            style={{height: 250, width: 250}}
            source={require('../assests/images/empty-cart.png')}></Image>
        </View>
      ) : (
        <>
          <FlatList
            data={data.address}
            renderItem={({item}) => (
              <View
                style={{
                  borderWidth: 1,
                  height: 110,
                  width: 375,
                  marginTop: 25,
                  alignSelf: 'center',
                  borderRadius: 12,
                  backgroundColor: 'white',
                  borderColor: '#ddd',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  elevation: 4,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}>
                  <RadioButton
                    color="#2E6BC6"
                    value={item.id}
                    status={checked === item.id ? 'checked' : 'unchecked'}
                    onPress={() => {
                      setChecked(item.id);
                    }}></RadioButton>
                  <Text
                    style={{textAlign: 'center', fontSize: 16, color: 'black'}}>
                    {item.checked}
                  </Text>

                  <TouchableOpacity
                    style={{marginLeft: 150}}
                    onPress={() =>
                      props.navigation.navigate('Add_Address', {item})
                    }>
                    <Icon1 name="edit" size={20}></Icon1>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handledelete(item.id)}>
                    <Icon name="delete" size={20}></Icon>
                  </TouchableOpacity>
                </View>
                <Text
                  style={{
                    fontSize: 16,
                    alignSelf: 'center',
                    marginTop: 5,
                  }}>{`${item.houseno},${item.street},${item.city},${item.state}.${item.pincode}`}</Text>
              </View>
            )}></FlatList>

          <View
            style={{
              borderColor: '#ccc',
              borderWidth: 3,
              justifyContent: 'flex-end',
              marginHorizontal: 10,
            }}>
            <View style={{marginLeft: 15}}>
              <Text style={{fontSize: 20, fontWeight: '500', color: 'black'}}>
                Cart Totals
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginRight: 15,
                }}>
                <Text
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  Total
                </Text>
                <Text
                  style={{
                    marginTop: 14,
                    fontSize: 17,
                    fontWeight: '500',
                    color: 'black',
                  }}>
                  {`₹${props.route.params.total}`}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: '#2E6BC6',
                  marginTop: 24,
                  marginHorizontal: 50,
                  marginBottom: 10,
                  borderRadius: 7,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 19,
                    textAlign: 'center',
                    padding: 10,
                  }}>
                  Proceed
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default AddressScreen;
