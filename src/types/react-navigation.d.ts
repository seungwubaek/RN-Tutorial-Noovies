import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

// Navigation
export type RootStackParamList = {
  Tabs: undefined;
  Stack: undefined;
};

// Navigation - Tab
export type TabParamList = {
  Movies: undefined;
  Tv: undefined;
  Search: undefined;
};

export type TabScreenProps<T extends keyof TabParamList> = BottomTabScreenProps<TabParamList, T>;

// 미완성: nested navigation
// export type TabNavigationProp<T extends keyof TabParamList> = NativeStackNavigationProp<
//   BottomTabNavigationProp<TabParamList, T>,
//   NativeStackNavigationProp<RootStackParamList>
// >;

// Navigation - Stack
export type StackParamList = {
  Detail: undefined;
};

export type StackScreenProps<T extends keyof StackParamList> = NativeStackScreenProps<StackParamList, T>;

// 미완성: nested navigation
// export type StackNavigationProp = CompositeNavigationProp<
//   NativeStackNavigationProp<StackParamList, 'Detail'>,
//   NativeStackNavigationProp<RootStackParamList>
// >;
