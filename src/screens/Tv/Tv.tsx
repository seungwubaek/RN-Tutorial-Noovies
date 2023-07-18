import React, { useCallback } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

// Components
import Loader from '~/components/organisms/Loader';
import HList from '~/components/organisms/HList';

// Api
import tvApi from '~/apis/tv';

// Types
import { TabScreenProps } from '~/types/react-navigation';

const Tv: React.FC<TabScreenProps<'Tv'>> = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const queryClient = useQueryClient();

  const selectFn = useCallback(
    (data: InfiniteData<{ page: number; results: any[]; total_pages: number; total_results: number }>) => {
      let tmpDataKeys: Array<number> = [];
      const tmpData: any = {
        pageParams: data.pageParams,
        pages: [],
      };
      data.pages.forEach((page) => {
        const filteredActualData = page.results.filter((item) => {
          if (tmpDataKeys.includes(item.id)) {
            return false;
          } else {
            tmpDataKeys.push(item.id);
            return true;
          }
        });
        tmpData.pages.push({
          page: page.page,
          results: filteredActualData,
          total_pages: page.total_pages,
          total_results: page.total_results,
        });
      });
      return tmpData;
    },
    []
  );

  const {
    isLoading: todayLoading,
    data: todayData,
    hasNextPage: todayHasNextPage,
    fetchNextPage: todayFetchNextPage,
  } = useInfiniteQuery(['tv', 'today'], tvApi.getAiringToday, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
    select: selectFn,
  });

  const {
    isLoading: topLoading,
    data: topData,
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
  } = useInfiniteQuery(['tv', 'top'], tvApi.getTopRated, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
    select: selectFn,
  });

  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery(['tv', 'trending'], tvApi.getTrending, {
    getNextPageParam: (currentPage) => {
      const nextPage = currentPage.page + 1;
      return nextPage > currentPage.total_pages ? null : nextPage;
    },
    select: selectFn,
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['tv']);
    setRefreshing(false);
  }, []);

  const loadMoreData = useCallback(
    ({ hasNextPage, fetchNextPage }: { hasNextPage?: boolean; fetchNextPage: () => void }) => {
      if (hasNextPage) {
        fetchNextPage();
      }
    },
    []
  );

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  // [2023-07-19 Issue]
  // Warning: Encountered two children with the same key, `134224` 문제 확인
  // 아래 코드로 데이터를 수동 확인하고, TMDB Server에서 받은 데이터에 실제로 중복된 ID가 존재함을 확인할 수 있었음
  // console.log(
  //   'todayData',
  //   todayData?.pages.map((page) => page.results.map((item) => [item.id, item.original_name])).flat()
  // );

  return (
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{
        paddingVertical: 20,
      }}
    >
      <HList
        title="Trending"
        data={trendingData?.pages.map((page) => page.results).flat() || []}
        loadMoreData={() => loadMoreData({ hasNextPage: trendingHasNextPage, fetchNextPage: trendingFetchNextPage })}
      />
      <HList
        title="Airing Today"
        data={todayData?.pages.map((page) => page.results).flat() || []}
        loadMoreData={() => loadMoreData({ hasNextPage: todayHasNextPage, fetchNextPage: todayFetchNextPage })}
      />
      <HList
        title="Top Rated"
        data={topData?.pages.map((page) => page.results).flat() || []}
        loadMoreData={() => loadMoreData({ hasNextPage: topHasNextPage, fetchNextPage: topFetchNextPage })}
      />
    </ScrollView>
  );
};

export default Tv;
