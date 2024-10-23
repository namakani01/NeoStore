import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import UserprofileScreen from '../screens/UserprofileScreen';
import TableScreen from '../screens/TableScreen';
import ProductDetails from '../screens/ProductDetails';
import ChairScreen from '../screens/ChairScreen';
import SofaScreen from '../screens/SofaScreen';
import BedsScreen from '../screens/BedsScreen';
import AddressScreen from '../screens/AddressScreen';
import UpdateDetails from '../screens/UpdateDetails';
import ChangePassword from '../screens/ChangePassword';
import {TouchableOpacity} from 'react-native';
import Add_Address from '../screens/Addaddresss';
import {useSelector} from 'react-redux';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = props => {
  // console.log('HELLO', props);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="Chair" component={ChairScreen} />
      <Stack.Screen name="Sofa" component={SofaScreen} />
      <Stack.Screen name="Beds" component={BedsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Select Address',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Add_Address')}>
              <Icon3 name="plus" size={21} color="black"></Icon3>
            </TouchableOpacity>
          ),
        }}
        name="Address"
        component={AddressScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Add New Address',
          headerTitleAlign: 'center',
        }}
        name="Add_Address"
        component={Add_Address}></Stack.Screen>
      <Stack.Screen
        name="UpdateDetails"
        component={UpdateDetails}></Stack.Screen>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}></Stack.Screen>
    </Stack.Navigator>
  );
};

const MyTabs = () => {
  
  const cartCount = useSelector(state => state.cart.cartCount);

  console.log('cartCount>>>', cartCount);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 13, color: 'black'},
        headerShown: false,
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon name={'home-outline'} size={26} color={'black'}></Icon>
          ),
        }}
        name="Home"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon1 name={'shoppingcart'} size={25} color={'black'}></Icon1>
          ),
          // tabBarBadge: 0,
          tabBarBadge: cartCount > 0 ? cartCount : null, // Show badge only if cartCount > 0
          tabBarBadgeStyle: {backgroundColor: '#2E6BC6'},
        }}
        name="Cart"
        component={CartScreen}
      />

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon2 name="user" size={25} color={'black'}></Icon2>
          ),
        }}
        name="Profile"
        component={UserprofileScreen}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
