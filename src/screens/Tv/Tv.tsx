import React, { useCallback } from 'react';
import {
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Components
import Loader from '~/components/organisms/Loader';
import HList from '~/components/organisms/HList';

// Api
import tvApi from '~/apis/tv';

const Tv: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(['tv', 'today'], tvApi.getAiringToday);

  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(['tv', 'top'], tvApi.getTopRated);

  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(['tv', 'trending'], tvApi.getTrending);

  const onRefresh = useCallback(() => {
    queryClient.refetchQueries(['tv']);
  }, []);

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />
  }

  const refreshing = todayRefetching || topRefetching || trendingRefetching;


  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      contentContainerStyle={{
        paddingVertical: 20,
      }}
    >
      <HList
        title="Trending"
        data={trendingData.results}
      />
      <HList
        title="Airing Today"
        data={todayData.results}
      />
      <HList
        title="Top Rated"
        data={topData.results}
      />
    </ScrollView>
  )
};

export default Tv;
