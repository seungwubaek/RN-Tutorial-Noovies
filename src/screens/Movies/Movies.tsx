import React, { useCallback } from 'react';
import { Alert, Dimensions, ListRenderItem } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

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
import { ListTitle, StFlatListContainer } from './Movies.style';

// Types
import { TabScreenProps } from '~/types/react-navigation';
import { Movie, MovieResponse } from '~/types/api';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const Movies: React.FC<TabScreenProps<'Movies'>> = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    hasNextPage: nowPlayingHasNextPage,
    fetchNextPage: nowPlayingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(['movie', 'nowPlaying'], movieApi.getNowPlaying, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage: upcomingHasNextPage,
    fetchNextPage: upcomingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(['movie', 'upcoming'], movieApi.getUpcoming, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery<MovieResponse>(['movie', 'trending'], movieApi.getTrending, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movie']);
    setRefreshing(false);
  }, [queryClient]);

  const loadMoreData = useCallback(
    ({ hasNextPage, fetchNextPage }: { hasNextPage?: boolean; fetchNextPage: () => void }) => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
    []
  );

  const renderHMedia = useCallback<ListRenderItem<Movie>>(
    ({ item }) => (
      <HMedia
        posterPath={item.poster_path}
        originalTitle={item.original_title}
        overview={item.overview}
        releaseDate={item.release_date}
        fullData={item}
      />
    ),
    []
  );

  const movieKeyExtractor = useCallback((item: Movie) => item.id.toString(), []);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  return loading ? (
    <Loader />
  ) : (
    <StFlatListContainer
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      refreshing={refreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={() => (
        <>
          {nowPlayingData ? (
            <SwiperFlatList
              autoplay={true}
              autoplayLoop={true}
              autoplayDelay={3.5}
              contentContainerStyle={{
                height: HEIGHT / 4,
                marginBottom: 30,
              }}
              showPagination={false}
              data={nowPlayingData?.pages.map((page) => page.results).flat() || []}
              onEndReached={() =>
                loadMoreData({ hasNextPage: nowPlayingHasNextPage, fetchNextPage: nowPlayingFetchNextPage })
              }
              onEndReachedThreshold={0}
              keyExtractor={movieKeyExtractor}
              renderItem={({ item }) => (
                <Slide
                  backdropPath={item.backdrop_path}
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                  overview={item.overview}
                  fullData={item}
                />
              )}
            />
          ) : null}
          {trendingData ? (
            <HList
              title="Trending Movies"
              data={trendingData?.pages.map((page) => page.results).flat() || []}
              loadMoreData={() =>
                loadMoreData({ hasNextPage: trendingHasNextPage, fetchNextPage: trendingFetchNextPage })
              }
            />
          ) : null}
          <ListTitle>Coming Soon</ListTitle>
        </>
      )}
      ItemSeparatorComponent={VSeparator}
      data={upcomingData?.pages.map((page) => page.results).flat() || []}
      onEndReached={() => loadMoreData({ hasNextPage: upcomingHasNextPage, fetchNextPage: upcomingFetchNextPage })}
      onEndReachedThreshold={0.5}
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
