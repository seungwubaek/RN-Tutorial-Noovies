import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

export const StScrollViewContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.mainBackground};
`;

export const StViewColumn = styled.View`
  flex-direction: row;
`;

export const StTextTitle = styled.Text`
  flex-shrink: 1;
  color: ${({ theme }) => theme.mainText};
  font-size: 24px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 500;
`;

export const StViewData = styled.View`
  padding: 0px 20px;
`;

export const StTextOverview = styled.Text`
  color: ${({ theme }) => theme.subText};
  margin: 20px 0;
`;

export const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export const StViewHeader = styled.View`
  height: ${HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

export const StBtnShare = styled.TouchableOpacity``;

export const StImageBackground = styled.Image``;

export const StTouchableOpacityVideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;

export const StTextOfVideoBtn = styled.Text`
  flex-shrink: 1;
  color: ${({ theme }) => theme.mainText};
  font-weight: 600;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;
