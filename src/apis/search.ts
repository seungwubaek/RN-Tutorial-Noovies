import { API_KEY, BASE_URL } from '~/apis';

// type
import { QueryFunctionContext } from '@tanstack/react-query';

const searchMovies = async ({ queryKey }: QueryFunctionContext) => {
  const [, , query] = queryKey;
  return fetch(`${BASE_URL}/search/movie?language=ko-KR&region=KR&query=${query}&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

const searchTv = async ({ queryKey }: QueryFunctionContext) => {
  const [, , query] = queryKey;
  return fetch(`${BASE_URL}/search/tv?language=ko-KR&query=${query}&api_key=${API_KEY}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }).then((resp) => resp.json());
};

export default {
  searchMovies,
  searchTv,
};
