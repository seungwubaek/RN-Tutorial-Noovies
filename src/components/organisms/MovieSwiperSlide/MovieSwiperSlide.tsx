import React, { memo, useCallback } from 'react';
import { Dimensions, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

// Components
import Poster from '~/components/molecules/Poster';

// Scripts
import { makeImgPath } from '~/helpers/movie/path';

// Styles
import {
  SwiperItem,
  StImageBackground,
  NowShowingContentWrapper,
  NowShowingContentColumn,
  NowShowingTitle,
  NowShowingOverView,
  NowShowingVotes,
} from './MovieSwiperSlide.style';

// Api
import { Movie as modelMovie, Tv as modelTv } from '~/types/api';

// Types

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
  fullData: modelMovie | modelTv;
}

const Slide: React.FC<SlideProps> = ({ backdropPath, posterPath, originalTitle, voteAverage, overview, fullData }) => {
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
    <TouchableWithoutFeedback onPress={goToDetail}>
      <SwiperItem>
        <StImageBackground source={{ uri: makeImgPath(backdropPath) }} />
        {/*
        `react-native-community/blur`는 blur 효과가 더 좋은 library이긴 하나,
        `expo start --dev-client` 명령어로만 작동하며
        `expo start` 명령어로는 작동하지 않는다.
        테스트 디바이스의 환경 차이일텐데.. 정확히 왜인질 모르겠음.
        차후, library 자체가 업데이트 되면 해결될 수도 있음.
      */}
        {/* <BlurView
        blurType={isDark ? 'dark' : 'light'}
        blurAmount={10}
        style={StyleSheet.absoluteFill}
      /> */}
        <BlurView intensity={110} tint="dark" style={StyleSheet.absoluteFill} />
        <NowShowingContentWrapper>
          <Poster path={posterPath} />
          <NowShowingContentColumn>
            <NowShowingTitle>{originalTitle}</NowShowingTitle>
            {voteAverage > 0 ? <NowShowingVotes>⭐ {voteAverage}/10</NowShowingVotes> : null}
            <NowShowingOverView>{overview.slice(0, 90)}...</NowShowingOverView>
          </NowShowingContentColumn>
        </NowShowingContentWrapper>
      </SwiperItem>
    </TouchableWithoutFeedback>
  );
};

export default memo(Slide);
