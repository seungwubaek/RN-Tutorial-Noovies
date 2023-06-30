import { API_KEY } from '~/apis'

export const getNowPlaying = async () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR&api_key=${API_KEY}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    }
  );
};

export const getUpcoming = async () => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1&region=KR&api_key=${API_KEY}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    }
  );
}

export const getTrending = async () => {
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?language=ko-KR&page=1&region=KR&api_key=${API_KEY}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    }
  );
}
