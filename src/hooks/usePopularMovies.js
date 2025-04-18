import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const getPopularMovies = () => {
  return api.get('/movie/popular?language=ko-KR');
};

export const usePopularMoviesQuery = () => {
  return useQuery({
    queryKey: ['movie-popular'],
    queryFn: getPopularMovies,
    select: (result) => result.data,
  });
};
