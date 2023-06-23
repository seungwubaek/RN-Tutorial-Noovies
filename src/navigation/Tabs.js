import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Text, View } from 'react-native';

import Movies from '../screens/Movies';
import Tv from '../screens/Tv';
import Search from '../screens/Search';

const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'purple',
      tabBarStyle: {
        backgroundColor: 'tomato',
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'tomato',
      },
      headerRight: () => <View><Text>hello</Text></View>,
    }}
  >
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="TV" component={Tv} options={{tabBarBadge: 'hello'}}/>
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
)

export default Tabs;
