import React, { memo, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import Poster from '~/components/molecules/Poster';
import Votes from '~/components/molecules/Votes';

// Api
import { Movie as modelMovie, Tv as modelTv } from '~/types/api';

// Styles
import { StTextMoviePosterTitle } from '~/components/molecules/Poster/Poster.style';
import { StTextOverview, StTextRelease, StViewHColumn, StViewHMovie } from './HMedia.style';

interface HMediaProps {
  posterPath: string | null;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: modelMovie | modelTv;
}

const HMedia: React.FC<HMediaProps> = ({ posterPath, originalTitle, overview, releaseDate, voteAverage, fullData }) => {
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
      <StViewHMovie>
        <Poster path={posterPath} />
        <StViewHColumn>
          <StTextMoviePosterTitle posterWidth={false}>
            {originalTitle.length > 30 ? `${originalTitle.slice(0, 30)}...` : originalTitle}
          </StTextMoviePosterTitle>
          {releaseDate ? (
            <StTextRelease>
              {new Date(releaseDate).toLocaleDateString('ko', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </StTextRelease>
          ) : null}
          {voteAverage ? <Votes voteAverage={voteAverage} /> : null}
          <StTextOverview numberOfLines={3}>{overview}</StTextOverview>
        </StViewHColumn>
      </StViewHMovie>
    </TouchableOpacity>
  );
};

export default memo(HMedia);
