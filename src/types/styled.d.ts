import 'styled-components/native'

declare module 'styled-components/native' {
  export interface DefaultTheme {
    tabBarBackground: string;
    tabBarLabel: string;
    tabBarLabelInactive: string;
    mainBackground: string;
    mainText: string;
    subText: string;
    testColor1: string;
    testColor2: string;
    testColor3: string;
  }
}
