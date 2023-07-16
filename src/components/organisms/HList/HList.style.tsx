import styled from 'styled-components/native';

export const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const ListTitle = styled.Text`
  color: ${({theme}) => theme.mainText};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 10px;
`;
