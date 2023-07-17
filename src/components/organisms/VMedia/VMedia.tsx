import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

// Components
import Poster from '~/components/molecules/Poster';
import Votes from '~/components/molecules/Votes';

// Styles
import { StTextMoviePosterTitle } from '~/components/molecules/Poster/Poster.style';

const Movie = styled.View`
  align-items: center;
`;

interface VMediaProps {
  posterPath: string | null;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({ posterPath, originalTitle, voteAverage }) => {
  const navigation = useNavigation();
  const goToDetail = useCallback(() => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
    });
  }, [navigation]);

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <StTextMoviePosterTitle numberOfLines={1} posterWidth={true}>
          {originalTitle}
        </StTextMoviePosterTitle>
        <Votes voteAverage={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
