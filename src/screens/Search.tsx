import React, { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components/native';

// Components
import Loader from '~/components/organisms/Loader';
import HList from '~/components/organisms/HList/HList';

// Api
import searchApi from '~/apis/search';

// Types
import { TabScreenProps } from '~/types/react-navigation';

// Styles
const StViewContainer = styled.View``;

const StTextInputSearch = styled.TextInput`
  width: 90%;
  padding: 5px 15px;
  margin: 20px auto;
  margin-bottom: 30px;
  background-color: #fff;
  border-radius: 15px;
`;

const Search: React.FC<TabScreenProps<'Search'>> = () => {
  const [query, setQuery] = React.useState('');

  const {
    isInitialLoading: searchMoviesInitialLoading,
    data: searchMoviesData,
    refetch: searchMoviesRefetch,
  } = useQuery(['search', 'movies', query], searchApi.searchMovies, {
    enabled: false,
  });

  const {
    isInitialLoading: searchTvInitialLoading,
    data: searchTvData,
    refetch: searchTvRefetch,
  } = useQuery(['search', 'tv', query], searchApi.searchTv, {
    enabled: false,
  });

  const onTextChange = useCallback((text: string) => {
    setQuery(text);
  }, []);

  const onSubmit = useCallback(() => {
    if (query === '') {
      return;
    }
    searchMoviesRefetch();
    searchTvRefetch();
  }, [query]);

  return (
    <StViewContainer>
      <StTextInputSearch
        placeholder="Search for movies or TV shows"
        placeholderTextColor="grey"
        returnKeyLabel="Search"
        onChangeText={onTextChange}
        onSubmitEditing={onSubmit}
      />
      {searchMoviesInitialLoading || searchTvInitialLoading ? <Loader /> : null}
      {searchMoviesData ? <HList title="Movie Results" data={searchMoviesData.results} /> : null}
      {searchTvData ? <HList title="TV Results" data={searchTvData.results} /> : null}
    </StViewContainer>
  );
};

export default Search;
