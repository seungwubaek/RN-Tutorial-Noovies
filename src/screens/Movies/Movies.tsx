import React, { useEffect, useState, useCallback } from 'react';
import {
  Dimensions,
  RefreshControl,
} from 'react-native';
import { ActivityIndicator, useColorScheme, View, Text } from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';

// Components
import Slide from '~/components/organisms/MovieSwiperSlide';
import VMedia from '~/components/organisms/VMedia';
import HMedia from '~/components/organisms/HMedia';

// Scripts
import { getNowPlaying, getTrending, getUpcoming } from '~/apis/movie';

// Styles
import {
  Loader,
  ListTitle,
  ListContainer,
  StFlatListTrending,
  StFlatListUpcoming,
  StFlatListContainer,
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
          data={nowPlaying}
          renderItem={({ item }: { item: any }) => (
            <Slide key={item.id}
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
          <StFlatListTrending
            data={trending}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item: any) => item.id.toString()}
            contentContainerStyle={{ paddingLeft: 30, paddingRight: 20 }}
            ItemSeparatorComponent={() => <View style={{ width: 20 }}></View>}
            renderItem={({ item }: { item: any }) => (
              <VMedia
                posterPath={item.poster_path}
                originalTitle={item.original_title}
                voteAverage={item.vote_average}
              />
            )}
          />
        </ListContainer>
        <ListTitle>Coming Soon</ListTitle>
      </>}
      data={upComing}
      keyExtractor={(item: any) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
      renderItem={({ item }: { item: any }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  )
}

export default Movies;
