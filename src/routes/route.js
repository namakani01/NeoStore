import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
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
import Checkout from '../screens/Checkout';
import Myorders from '../screens/Myorders';
import OrderDetails from '../screens/OrderDetails';
import SearchScreen from '../screens/ProductSearch';
import MapScreen from '../screens/MapScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeScreen}></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Table',
          headerTitleAlign: 'center',
        }}
        name="Table"
        component={TableScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Chair',
          headerTitleAlign: 'center',
        }}
        name="Chair"
        component={ChairScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Sofa',
          headerTitleAlign: 'center',
        }}
        name="Sofa"
        component={SofaScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Beds',
          headerTitleAlign: 'center',
        }}
        name="Beds"
        component={BedsScreen}
      />
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
        options={{
          headerShown: true,
          title: 'Checkout',
          headerTitleAlign: 'center',
        }}
        name="checkout"
        component={Checkout}></Stack.Screen>
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Profile',
          headerTitleAlign: 'center',
        }}
        name="Profile"
        component={UserprofileScreen}></Stack.Screen>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'My Orders',
          headerTitleAlign: 'center',
        }}
        name="myorders"
        component={Myorders}></Stack.Screen>

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Order Details',
          headerTitleAlign: 'center',
        }}
        name="orderdetails"
        component={OrderDetails}></Stack.Screen>

      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Update Details',
          headerTitleAlign: 'center',
        }}
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
            <Icon3 name="search1" size={21} color={'black'}></Icon3>
          ),
        }}
        name="search"
        component={SearchScreen}></Tab.Screen>

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon4 name="google-maps" size={21} color={'black'}></Icon4>
          ),
        }}
        name="Map"
        component={MapScreen}></Tab.Screen>

      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Icon1 name={'shoppingcart'} size={25} color={'black'}></Icon1>
          ),
          tabBarBadge: cartCount > 0 ? cartCount : null,
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
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
