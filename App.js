import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useAssets } from 'expo-asset';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider } from 'styled-components/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import Root from '~/navigations/Root';

import darkTheme from '~/styles/themes';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = Font.useFonts(Ionicons.font);
  const [assets, error] = useAssets(['https://avatars.githubusercontent.com/u/22609242?v=4']);

  useEffect(() => {
    if (fontsLoaded && assets) {
      setAppIsReady(true);
    }
    if (error) {
      console.log(error);
    }
  }, [fontsLoaded, assets, error]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <NavigationContainer>
          <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <Root />
          </View>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
