import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

const StyledBtn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color:  ${({ theme }) => theme.mainBackground};
`;

const StyledText = styled.Text`
  color: ${({ theme }) => theme.mainText};
`;

const Movies = ({ navigation: { navigate }}) => (
  <StyledBtn
    onPress={() => navigate('Stack', { screen: 'Three' })}
  >
    <StyledText>Movies</StyledText>
  </StyledBtn>
);

export default Movies;
