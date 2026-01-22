import { createApiUrl } from './config';
import { MovieCategory, MovieDetails, MovieListResponse } from './types';

export const fetchMoviesByCategory = async (
  category: MovieCategory,
  language: string,
  page: number = 1
): Promise<MovieListResponse> => {
  const url = createApiUrl(`/movie/${category}`, { language, page });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${category} movies: ${response.status}`);
  }

  return response.json();
};

export const fetchMovieDetails = async (
  movieId: number,
  language: string
): Promise<MovieDetails> => {
  const url = createApiUrl(`/movie/${movieId}`, { language });

  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Movie not found');
    }
    throw new Error(`Failed to fetch movie details: ${response.status}`);
  }

  return response.json();
};

export const searchMovies = async (
  query: string,
  language: string,
  page: number = 1
): Promise<MovieListResponse> => {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const url = createApiUrl('/search/movie', {
    query: query.trim(),
    language,
    page,
    include_adult: 'false',
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
};
