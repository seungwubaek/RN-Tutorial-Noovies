import { API_KEY, BASE_URL } from '~/apis';

// type
import { QueryFunctionContext } from '@tanstack/react-query';

const getNowPlaying = async () => {
  return fetch(`${BASE_URL}/movie/now_playing?language=ko-KR&page=1&region=KR&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

const getTrending = async () => {
  return fetch(`${BASE_URL}/trending/movie/week?language=ko-KR&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

const getUpcoming = async ({ pageParam }: QueryFunctionContext) => {
  return fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=${pageParam}&region=KR&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

const getDetail = async ({ queryKey }: QueryFunctionContext) => {
  const [, id] = queryKey;
  return fetch(`${BASE_URL}/movie/${id}?language=ko-KR&append_to_response=videos,images&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

export default {
  getNowPlaying,
  getTrending,
  getUpcoming,
  getDetail,
};
