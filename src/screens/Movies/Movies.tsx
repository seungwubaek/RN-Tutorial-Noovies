import React, { useCallback } from 'react';
import {
  Dimensions,
  ListRenderItem,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Components
import Loader from '~/components/organisms/Loader';
import Slide from '~/components/organisms/MovieSwiperSlide';
import VMedia from '~/components/organisms/VMedia';
import HMedia from '~/components/organisms/HMedia';
import { VSeparator } from '~/components/molecules/VSeparator';
import HList from '~/components/organisms/HList/HList';

// Apis
import movieApi from '~/apis/movie';

// Styles
import {
  ListTitle,
  StFlatListContainer,
} from './Movies.style';

// Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Movie, MovieResponse } from '~/apis/response';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Movies: React.FC<BottomTabScreenProps<any, 'Movies'>> = ({ navigation: { navigate }}) => {
  const queryClient = useQueryClient();

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
    // refetchNowPlaying();
    // refetchUpcoming();
    // refetchTrending();
    queryClient.refetchQueries(['movie']);
  }, []);

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
    <StFlatListContainer
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={() => <>
        {
          nowPlayingData ?
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
          : null
        }
        {
          trendingData ?
            <HList title="Trending Movies" data={trendingData.results} />
          : null
        }
        <ListTitle>Coming Soon</ListTitle>
      </>}
      ItemSeparatorComponent={VSeparator}
      data={upcomingData?.results || []}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    />
  )
}

export default Movies;
