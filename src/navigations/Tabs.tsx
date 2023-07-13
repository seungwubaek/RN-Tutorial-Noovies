import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Movies from '~/screens/Movies';
import Tv from '~/screens/Tv';
import Search from '~/screens/Search';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '~/hooks/theme';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.mainBackground,
      }}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
        // headerStyle: {
        //   backgroundColor: colors.tabBarBackground,
        // },
        // headerTitleStyle: {
        //   color: colors.tabBarLabel,
        // },
        // headerTitleAlign: 'center',
        tabBarStyle: {
          backgroundColor: theme.tabBarBackground,
        },
        tabBarActiveTintColor: theme.tabBarLabel,
        tabBarInactiveTintColor: theme.tabBarLabelInactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen
        name="Movies" component={Movies}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="film-outline" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="TV" component={Tv}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="tv-outline" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="Search" component={Search}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return <Ionicons name="search-outline" size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

export default Tabs;
