import { API_KEY, BASE_URL } from '~/apis';

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

const getUpcoming = async () => {
  return fetch(`${BASE_URL}/movie/upcoming?language=ko-KR&page=1&region=KR&api_key=${API_KEY}`, {
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
};
