import React, { useEffect, useState, useCallback } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
} from 'react-native';
import { ActivityIndicator, useColorScheme, View, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useQuery } from '@tanstack/react-query';

// Components
import Loader from '~/components/organisms/Loader';
import Slide from '~/components/organisms/MovieSwiperSlide';
import VMedia from '~/components/organisms/VMedia';
import HMedia from '~/components/organisms/HMedia';

// Apis
import movieApi from '~/apis/movie';

// Styles
import {
  ListTitle,
  ListContainer,
  StFlatListContainer,
} from './Movies.style';

// Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { HSeperator } from '~/components/molecules/HSeperator';
import { VSeperator } from '~/components/molecules/VSeperator';
import { Movie, MovieResponse } from '~/apis/response';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const getAsyncJsonData = async (apiFunc: Function, stateSetter: Function) => {
  var resp = await apiFunc();
  var { results } = await resp.json();
  stateSetter(results);
}

const Movies: React.FC<BottomTabScreenProps<any, 'Movies'>> = ({ navigation: { navigate }}) => {
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    refetch: refetchNowPlaying,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(['movie', 'nowPlaying'], movieApi.getNowPlaying);

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    refetch: refetchUpcoming,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(['movie', 'upcoming'], movieApi.getUpcoming);

  const {
    isLoading: trendingLoading,
    data: trendingData,
    refetch: refetchTrending,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(['movie', 'trending'], movieApi.getTrending);


  const onRefresh = useCallback(async () => {
    refetchNowPlaying();
    refetchUpcoming();
    refetchTrending();
  }, []);

  const renderVMedia = useCallback<ListRenderItem<Movie>>(({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  ), []);

  const renderHMedia = useCallback<ListRenderItem<Movie>>(({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  ), []);

  const movieKeyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  return loading ? (
    <Loader />
  ) : (
    (nowPlayingData && upcomingData && trendingData) ?
    <StFlatListContainer
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={() => <>
        <SwiperFlatList
          autoplay={true}
          autoplayLoop={true}
          autoplayDelay={3.5}
          contentContainerStyle={{
            height: HEIGHT/4,
            marginBottom: 30,
          }}
          showPagination={false}
          data={nowPlayingData.results}
          keyExtractor={movieKeyExtractor}
          renderItem={({ item }) => (
            <Slide
              backdropPath={item.backdrop_path}
              posterPath={item.poster_path}
              originalTitle={item.original_title}
              voteAverage={item.vote_average}
              overview={item.overview}
            />
          )}
        />
        <ListContainer>
          <ListTitle>Trending Movies</ListTitle>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 30, paddingRight: 20 }}
            ItemSeparatorComponent={HSeperator}
            data={trendingData.results}
            keyExtractor={movieKeyExtractor}
            renderItem={renderVMedia}
          />
        </ListContainer>
        <ListTitle>Coming Soon</ListTitle>
      </>}
      ItemSeparatorComponent={VSeperator}
      data={upcomingData?.results || []}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    />
    :
    null
  )
}

export default Movies;
