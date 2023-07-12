import styled from 'styled-components/native';

export const StViewHMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

export const StViewHColumn = styled.View`
  margin-left: 15px;
  /* width: 80%; */
  flex: 1;
`;

export const StTextOverview = styled.Text`
  flex: 1;
  color: ${({theme}) => theme.subText};
  /* opacity: 0.8;
  width: 80%; */
`;

export const StTextRelease = styled.Text`
  color: ${({theme}) => theme.subText};
  font-size: 12px;
  margin-vertical: 10px;
  /* color: white;
  font-size: 12px;
  margin-vertical: 10px;
  font-weight: 500;
  opacity: 0.6; */
`;
