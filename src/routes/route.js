import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import UserprofileScreen from '../screens/UserprofileScreen';
import TableScreen from '../screens/TableScreen';
import ProductDetails from '../screens/ProductDetails';
import ChairScreen from '../screens/ChairScreen';
import SofaScreen from '../screens/SofaScreen';
import BedsScreen from '../screens/BedsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeStack" component={HomeScreen} />
      <Stack.Screen name="Table" component={TableScreen} />
      <Stack.Screen name="Chair" component={ChairScreen} />
      <Stack.Screen name="Sofa" component={SofaScreen} />
      <Stack.Screen name="Beds" component={BedsScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  );
};

const MyTabs = () => {
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
          tabBarBadge: 0,
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
