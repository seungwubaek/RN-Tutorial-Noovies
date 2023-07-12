import React from 'react';
import { Dimensions, StyleSheet, useColorScheme } from 'react-native';

// Components
import Poster from '~/components/molecules/Poster';

// Scripts
import { makeImgPath } from '~/helpers/movie/path';

// Styles
import {
  SwiperItem,
  StyledImageBackground,
  NowShowingContentWrapper,
  NowShowingContentColumn,
  NowShowingTitle,
  NowShowingOverView,
  NowShowingVotes,
} from './MovieSwiperSlide.style';

// Types
import { BlurView } from '@react-native-community/blur';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface SlideProps {
  backdropPath: string
  posterPath: string
  originalTitle: string
  voteAverage: number
  overview: string
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
 }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <SwiperItem>
      <StyledImageBackground
        source={{ uri: makeImgPath(backdropPath)}}
      />
      <BlurView
        blurType={isDark ? 'dark' : 'light'}
        blurAmount={10}
        style={StyleSheet.absoluteFill}
      />
        <NowShowingContentWrapper>
          <Poster path={posterPath} />
          <NowShowingContentColumn>
            <NowShowingTitle>{originalTitle}</NowShowingTitle>
            {voteAverage > 0 ? <NowShowingVotes>⭐ {voteAverage}/10</NowShowingVotes> : null}
            <NowShowingOverView>{overview.slice(0, 90)}...</NowShowingOverView>
          </NowShowingContentColumn>
        </NowShowingContentWrapper>
    </SwiperItem>
  )
}

export default Slide;
