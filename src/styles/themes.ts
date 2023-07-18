// it's from https://flatuicolors.com/palette/us

import { DefaultTheme } from 'styled-components/native';

export const darkTheme: DefaultTheme = {
  mode: 'dark',
  headerBackground: '#2d3436',
  headerText: 'white',
  tabBarBackground: '#2d3436',
  tabBarLabel: '#fdcb6e',
  tabBarLabelInactive: '#b2bec3',
  mainBackground: '#2d3436',
  mainText: 'white',
  subText: 'rgb(190, 190, 190)',
  testColor1: 'red',
  testColor2: 'blue',
  testColor3: 'green',
};

export const lightTheme: DefaultTheme = {
  mode: 'light',
  headerBackground: '#ffffff',
  headerText: 'white',
  tabBarBackground: '#ffffff',
  tabBarLabel: '#2d3436',
  tabBarLabelInactive: '#b2bec3',
  mainBackground: 'white',
  mainText: 'black',
  subText: '#636e72',
  testColor1: 'red',
  testColor2: 'blue',
  testColor3: 'green',
};

export default darkTheme;
