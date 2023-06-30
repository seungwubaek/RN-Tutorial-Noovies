import styled from 'styled-components/native';

export const Loader = styled.View`
  flex: 1;
  justify-content: center;
`;

export const StyledScrollView = styled.ScrollView`
  flex: 1;
`;

export const ListContainer = styled.View`
  margin-bottom: 40px;
`;

export const ListTitle = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 20px;
`;

// Trending

export const TrendingScrollView = styled.ScrollView``;

export const Movie = styled.View`
  margin-right: 10px;
  align-items: center;
`;

const PosterText = styled.Text<{ posterWidth?: boolean }>`
  width: ${({posterWidth}) => posterWidth ? '100px' : 'auto'};
`;

export const Title = styled(PosterText)`
  color: ${({theme}) => theme.mainText};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

export const Votes = styled(PosterText)`
  color: ${({theme}) => theme.subText};
  font-size: 10px;
`;

// Coming Soon

export const HMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

export const HColumn = styled.View`
  flex: 1;
  margin-left: 15px;
`;

export const Overview = styled.Text`
  flex: 1;
  color: ${({theme}) => theme.subText};
`;

export const ComingSoonReleaseDate = styled.Text`
  color: ${({theme}) => theme.subText};
  font-size: 12px;
  margin-vertical: 10px;
`;
