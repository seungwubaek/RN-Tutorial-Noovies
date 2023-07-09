import React, { useEffect, useState, useCallback } from 'react';
import { Dimensions, RefreshControl } from 'react-native';
import { ActivityIndicator, useColorScheme } from 'react-native';
import Swiper from 'react-native-swiper';

// Components
import Slide from '~/components/MovieSwiperSlide';
import Poster from '~/components/Poster';

// Scripts
import { getNowPlaying, getTrending, getUpcoming } from '~/apis/movie';

// Styles
import {
  Loader,
  StyledScrollView,
  ListTitle,
  TrendingScrollView,
  Movie,
  Title,
  Votes,
  ListContainer,
  HMovie,
  HColumn,
  Overview,
  ComingSoonReleaseDate,
} from './Movies.style';

// Types
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const getAsyncJsonData = async (apiFunc: Function, stateSetter: Function) => {
  var resp = await apiFunc();
  var { results } = await resp.json();
  stateSetter(results);
}

const Movies: React.FC<BottomTabScreenProps<any, 'Movies'>> = ({ navigation: { navigate }}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const isDark = useColorScheme() === 'dark';

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllData();
    setRefreshing(false);
  }, []);

  const getAsyncJsonData = useCallback(async (apiFunc: Function, stateSetter: Function) => {
    var resp = await apiFunc();
    var { results } = await resp.json();
    stateSetter(results);
  }, []);

  const fetchAllData = useCallback(async () => {
    await getAsyncJsonData(getNowPlaying, setNowPlaying);
    await getAsyncJsonData(getUpcoming, setUpcoming);
    await getAsyncJsonData(getTrending, setTrending);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAllData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <StyledScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Swiper
        autoplay={true}
        loop={true}
        autoplayTimeout={3.5}
        containerStyle={{
          height: HEIGHT/4,
          marginBottom: 30,
        }}
        showsPagination={false}
      >
        {
          nowPlaying.map((movie: any) => {
            return (
              <Slide key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            )
          })
        }
      </Swiper>
      <ListContainer>
        <ListTitle>Trending Movies</ListTitle>
        <TrendingScrollView
          horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 30, paddingRight: 20 }}
        >
          {
            trending.map((movie: any) =>
              <Movie key={movie.id}>
                <Poster path={movie.poster_path} />
                <Title numberOfLines={1} posterWidth>{movie.original_title}</Title>
                <Votes posterWidth>{movie.vote_average > 0 ? `⭐ ${movie.vote_average}/10` : `Coming Soon`}</Votes>
              </Movie>
            )
          }
        </TrendingScrollView>
      </ListContainer>
      <ListContainer>
        <ListTitle>Coming Soon</ListTitle>
        {
          upComing.map((movie: any) => {
            return (
              <HMovie key={movie.id}>
                <Poster path={movie.poster_path} />
                <HColumn>
                  <Title posterWidth={false}>{movie.original_title}</Title>
                  <ComingSoonReleaseDate>{new Date(movie.release_date).toLocaleDateString('ko', {year: 'numeric', month: 'long', day: 'numeric'})}</ComingSoonReleaseDate>
                  <Overview numberOfLines={3}>{movie.overview}</Overview>
                </HColumn>
              </HMovie>
            )
          })
        }
      </ListContainer>
    </StyledScrollView>
  )
}

export default Movies;
