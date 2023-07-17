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
  const [refreshing, setRefreshing] = React.useState(false);
  const queryClient = useQueryClient();

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  }, []);

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />
  }

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
