import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeContainer from './container/HomeContainer';
import ListContainer from './container/ListContainer';
import DetailsContainer from './container/DetailsContainer';

import LoginUser from './compoment/LoginUser';
import {connect} from 'react-redux';
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeContainer}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
function TabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'clock-o' : 'camera';
          } else if (route.name === 'Settings') {
            iconName = focused
              ? 'window-close-o'
              : 'assistive-listening-systems';
          }
          return <Icon size={size} name={iconName} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={LoginUser}
        options={{tabBarBadge: 3}}
      />
      <Tab.Screen name="Settings" component={DetailsContainer} />
    </Tab.Navigator>
  );
}
const Stack = createStackNavigator();
function DemoStack({selectedValue}) {
  console.log(': ', selectedValue);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabsNavigation}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="main"
        component={HomeStackScreen}
        options={{tabBarBadge: 3, title: 'Yêu ZK Trà Hâm'}}
      />
      <Stack.Screen
        name="List"
        component={ListContainer}
        options={{title: 'Tháng ' + selectedValue.split('thang')[1]}}
      />
    </Stack.Navigator>
  );
}
const MyAppNavigation = ({selectedValue}) => {
  return (
    <NavigationContainer>
      <DemoStack selectedValue={selectedValue} />
    </NavigationContainer>
  );
};
const connectState = ({mainReducer}) => ({
  selectedValue: mainReducer.selectedValue,
});
const MyApp = connect(connectState)(MyAppNavigation);
export default MyApp;
