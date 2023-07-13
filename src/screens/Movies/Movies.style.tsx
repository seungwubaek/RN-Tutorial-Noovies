import styled from 'styled-components/native';

export const Loader = styled.View`
  flex: 1;
  justify-content: center;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

export const StFlatListContainer = styled.FlatList``;

export const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const ListTitle = styled.Text`
  color: ${({theme}) => theme.mainText};
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

// Trending

export const StFlatListTrending = styled.FlatList``;

export const StFlatListUpcoming = styled.FlatList``;
