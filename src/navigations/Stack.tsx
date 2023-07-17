import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components/native';

// Components
import Detail from '~/screens/Detail';

// Types
import { StackParamList } from '~/types/react-navigation';

const NativeStack = createNativeStackNavigator<StackParamList>();

const Stack = () => {
  const theme = useTheme();

  return (
    <NativeStack.Navigator
      screenOptions={{
        animation: 'slide_from_right',
        headerStyle: {
          backgroundColor: theme.headerBackground,
        },
        headerTitleStyle: {
          color: theme.headerText,
        },
        headerTintColor: theme.headerText,
        headerTitleAlign: 'center',
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};

export default Stack;
