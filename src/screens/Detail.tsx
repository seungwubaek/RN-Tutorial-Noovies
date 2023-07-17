import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

// Types
import { StackScreenProps } from '~/types/react-navigation';

const StScrollViewContainer = styled.ScrollView`
  background-color: ${({ theme }) => theme.mainBackground};
`;

const Detail: React.FC<StackScreenProps<'Detail'>> = () => {
  return (
    <StScrollViewContainer>
      <Text>Hello</Text>
    </StScrollViewContainer>
  );
};

export default Detail;
