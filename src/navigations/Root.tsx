import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Components
import Tabs from './Tabs';
import Stack from './Stack';

// Types
import { RootStackParamList } from '~/types/react-navigation';

const Nav = createNativeStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    <Nav.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
};

export default Root;
