import React from 'react';
import {
  ScrollView,
  FlatList,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

// Components
import Loader from '~/components/organisms/Loader';

// Api
import tvApi from '~/apis/tv';
import VMedia from '~/components/organisms/VMedia/VMedia';

const Tv: React.FC = () => {
  const {
    isLoading: todayLoading,
    data: todayData,

  } = useQuery(['tv', 'today'], tvApi.getAiringToday);
  const {
    isLoading: topLoading,
    data: topData,

  } = useQuery(['tv', 'top'], tvApi.getTopRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,

  } = useQuery(['tv', 'trending'], tvApi.getTrending);

  const loading = todayLoading || topLoading || trendingLoading;
  if (loading) {
    return <Loader />
  }

  return (
    <ScrollView>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={trendingData.results}
        renderItem={({item}) => <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_name}
          voteAverage={item.vote_average}
        />}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={todayData.results}
        renderItem={({item}) => <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_name}
          voteAverage={item.vote_average}
        />}
      />
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={topData.results}
        renderItem={({item}) => <VMedia
          posterPath={item.poster_path}
          originalTitle={item.original_name}
          voteAverage={item.vote_average}
        />}
      />
    </ScrollView>
  )
};

export default Tv;
