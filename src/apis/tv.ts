import { API_KEY, BASE_URL } from '~/apis';

// Types
import { QueryFunctionContext } from '@tanstack/react-query';

const getTrending = async ({ pageParam }: QueryFunctionContext) => {
  return fetch(`${BASE_URL}/trending/tv/week?language=ko-KR&page=${pageParam ?? 1}&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

const getAiringToday = async ({ pageParam }: QueryFunctionContext) => {
  return fetch(`${BASE_URL}/tv/airing_today?language=ko-KR&page=${pageParam ?? 1}&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

const getTopRated = async ({ pageParam }: QueryFunctionContext) => {
  return fetch(`${BASE_URL}/tv/top_rated?language=ko-KR&page=${pageParam ?? 1}&api_key=${API_KEY}`, {
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
  getTrending,
  getAiringToday,
  getTopRated,
  getDetail,
};
