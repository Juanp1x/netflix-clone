import axios from 'axios';

const API_KEY = 'f70c90a6892c3d99e12c21a53ff2d79d';

const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdb = axios.create({
  baseURL: BASE_URL,
});

export const getTrendingMovies = async () => {
  const response = await tmdb.get(
    `/trending/movie/week?api_key=${API_KEY}&language=es-ES`
  );

  return response.data.results;
};

export const getImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};