import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome6'
import UserprofileScreen from '../screens/UserprofileScreen';

const Tab = createBottomTabNavigator();

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
              <Icon name={'home'} size={25} color={'black'}></Icon>
            ),
          }}
          name="Home"
          component={HomeScreen}></Tab.Screen>
        <Tab.Screen
          options={{
            tabBarIcon: () => (
              <Icon1 name={'cart'} size={25} color={'black'}></Icon1>
            ),
          }}
          name="Cart"
          component={CartScreen}></Tab.Screen>

          <Tab.Screen options={{tabBarIcon : () => (
            <Icon2 name = 'user' size = {25} color = {'black'}></Icon2>
          )}} name='Profile' component={UserprofileScreen}>

          </Tab.Screen>
      </Tab.Navigator>

  );
};

export default MyTabs;
