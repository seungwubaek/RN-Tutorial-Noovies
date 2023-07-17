import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const NativeStack = createNativeStackNavigator();

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Two')}>
      <Text>go to two</Text>
    </TouchableOpacity>
  );
};

const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Three')}>
      <Text>go to three</Text>
    </TouchableOpacity>
  );
};

const ScreenThree = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate('Tabs', { screen: 'Search' })}>
      <Text>go to Search Tab</Text>
    </TouchableOpacity>
  );
};

const Stack = () => {
  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
};

export default Stack;
