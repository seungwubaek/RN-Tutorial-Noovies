import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

// Components
import Poster from '~/components/molecules/Poster';
import Votes from '~/components/molecules/Votes';

// Styles
import { StTextMoviePosterTitle } from '~/components/molecules/Poster/Poster.style';

// Types
import { Movie as modelMovie, Tv as modelTv } from '~/types/api';

const Movie = styled.View`
  align-items: center;
`;

interface VMediaProps {
  posterPath: string | null;
  originalTitle: string | undefined; // 실제로는 undefined는 나오지 않을 것이며, Movie.original_title or Tv.original_name 중 하나가 올 것
  voteAverage: number;
  fullData: modelMovie | modelTv;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();
  const goToDetail = useCallback(() => {
    //@ts-ignore
    navigation.navigate('Stack', {
      screen: 'Detail',
      params: {
        ...fullData,
      },
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

export default memo(VMedia);
