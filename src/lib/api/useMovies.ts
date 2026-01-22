import { Locale } from '@/lib/i18n/routing';
import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { fetchMovieDetails, fetchMoviesByCategory, searchMovies } from './movies';
import { MovieCategory, MovieDetails, MovieListResponse } from './types';
import { getApiLanguage } from '../utils';

// Query key factory for consistent cache key generation
export const movieKeys = {
  all: ['movies'] as const,
  lists: () => [...movieKeys.all, 'list'] as const,
  list: (category: MovieCategory, language: string, page: number) =>
    [...movieKeys.lists(), category, language, page] as const,
  details: () => [...movieKeys.all, 'detail'] as const,
  detail: (id: number, language: string) => [...movieKeys.details(), id, language] as const,
  search: (query: string, language: string, page: number) =>
    [...movieKeys.all, 'search', query, language, page] as const,
};

// Hook to fetch movies by category
export const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  const locale = useLocale();
  const apiLanguage = getApiLanguage(locale as Locale);

  return useQuery<MovieListResponse, Error>({
    queryKey: movieKeys.list(category, apiLanguage, page),
    queryFn: () => fetchMoviesByCategory(category, apiLanguage, page),
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to fetch movie details
export const useMovieDetails = (movieId: number | undefined, enabled: boolean = true) => {
  const locale = useLocale();
  const apiLanguage = getApiLanguage(locale as Locale);

  return useQuery<MovieDetails, Error>({
    queryKey: movieKeys.detail(movieId!, apiLanguage),
    queryFn: () => fetchMovieDetails(movieId!, apiLanguage),
    enabled: enabled && movieId !== undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};

// Hook to search movies
export const useSearchMovies = (query: string, page: number = 1, enabled: boolean = true) => {
  const locale = useLocale();
  const apiLanguage = getApiLanguage(locale as Locale);

  return useQuery<MovieListResponse, Error>({
    queryKey: movieKeys.search(query, apiLanguage, page),
    queryFn: () => searchMovies(query, apiLanguage, page),
    enabled: enabled && query.trim().length > 0,
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 5, // 5 minutes
  });
};
