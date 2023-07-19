import React, { useCallback, useEffect } from 'react';
import { Platform, Linking, Share, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from 'styled-components/native';
import * as WebBrowser from 'expo-web-browser';

// Components
import { Ionicons } from '@expo/vector-icons';
import Loader from '~/components/organisms/Loader';
import Poster from '~/components/molecules/Poster/Poster';

// Apis
import movieApi from '~/apis/movie';
import tvApi from '~/apis/tv';

// Scripts
import { makeImgPath } from '~/helpers/movie/path';

// Types
import { StackScreenProps } from '~/types/react-navigation';
import { Movie, Tv, Video } from '~/types/api';

// Styles
import {
  StImageBackground,
  StScrollViewContainer,
  StTextOfVideoBtn,
  StTextOverview,
  StTextTitle,
  StTouchableOpacityVideoBtn,
  StViewData,
  StViewColumn,
  StViewHeader,
  StBtnShare,
} from './Detail.style';

const ShareBtn: React.FC<{
  isMovie: boolean;
  params: Movie | Tv;
  data: any;
}> = (props) => {
  const { isMovie, params, data } = props;
  const theme = useTheme();
  const openShare = useCallback(async () => {
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;

    if (Platform.OS === 'android') {
      await Share.share({
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
        message: `${params.overview}\nCheck it out: ${homepage}`,
      });
    } else {
      await Share.share({
        title:
          'original_title' in params
            ? params.original_title
            : params.original_name,
        url: homepage,
      });
    }
  }, []);

  return (
    <StBtnShare onPress={openShare}>
      <Ionicons name="share-social-outline" size={24} color={theme.mainText} />
    </StBtnShare>
  );
};

const Detail: React.FC<StackScreenProps<'Detail'>> = (props) => {
  const { setOptions } = props.navigation;
  const { params } = props.route;
  const theme = useTheme();
  const isMovie = 'original_title' in params;

  const { isLoading, data } = useQuery(
    [isMovie ? 'movies' : 'tv', params.id],
    isMovie ? movieApi.getDetail : tvApi.getDetail
  );

  useEffect(() => {
    setOptions({
      title: 'original_title' in params ? 'Movie' : 'TV Show',
    });
  }, []);

  useEffect(() => {
    if (data)
      setOptions({
        headerRight: () => (
          <ShareBtn isMovie={isMovie} params={params} data={data} />
        ),
      });
  }, [data]);

  const openYTLink = useCallback(async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    // Method 1: open with external browser or app
    // await Linking.openURL(baseUrl);

    // Method 2: open with in-app browser(?)
    let browserPackage: string | undefined;
    if (Platform.OS === 'android') {
      const tabsSupportingBrowsers =
        await WebBrowser.getCustomTabsSupportingBrowsersAsync();
      browserPackage = tabsSupportingBrowsers?.defaultBrowserPackage;
    }
    await WebBrowser.openBrowserAsync(baseUrl, {
      browserPackage,
      showTitle: true,
      toolbarColor: theme.mainBackground,
    });
  }, []);

  return (
    <StScrollViewContainer>
      <StViewHeader>
        <StImageBackground
          source={{ uri: makeImgPath(params.backdrop_path || '') }}
          style={StyleSheet.absoluteFill}
        />
        <LinearGradient
          colors={['transparent', theme.mainBackground]}
          style={StyleSheet.absoluteFill}
        />
        <StViewColumn>
          <Poster path={params.poster_path || ''} />
          <StTextTitle>
            {'original_title' in params
              ? params.original_title
              : params.original_name}
          </StTextTitle>
        </StViewColumn>
      </StViewHeader>
      <StViewData>
        <StTextOverview>{params.overview}</StTextOverview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video: Video) => (
          <StTouchableOpacityVideoBtn
            key={video.key}
            onPress={() => openYTLink(video.key)}
          >
            <Ionicons name="logo-youtube" size={24} color="white" />
            <StTextOfVideoBtn>{video.name}</StTextOfVideoBtn>
          </StTouchableOpacityVideoBtn>
        ))}
      </StViewData>
    </StScrollViewContainer>
  );
};

export default Detail;
