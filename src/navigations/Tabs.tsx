import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Movies from '~/screens/Movies';
import Tv from '~/screens/Tv';
import Search from '~/screens/Search';

import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '~/hooks/theme';

import { TabParamList } from '~/types/react-navigation';

const Tab = createBottomTabNavigator<TabParamList>();

const Tabs = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.mainBackground,
      }}
      screenOptions={{
        unmountOnBlur: true,
        headerShown: true,
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTitleStyle: {
          color: theme.headerText,
        },
        headerTitleAlign: 'center',
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
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="film-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="tv-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return <Ionicons name="search-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
