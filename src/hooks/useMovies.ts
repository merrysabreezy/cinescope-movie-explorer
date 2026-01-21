"use client";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { tmdb } from "@/lib/api/tmdb";

export const useMovies = (
  category: "popular" | "top_rated" | "upcoming",
  locale: string,
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["movies", category, locale, page],
    queryFn: () => tmdb.fetchMovies(category, locale, page),
    staleTime: 5 * 60 * 1000,
  });
};

export const useInfiniteMovies = (
  category: "popular" | "top_rated" | "upcoming",
  locale: string,
) => {
  return useInfiniteQuery({
    queryKey: ["movies", category, locale],
    queryFn: ({ pageParam = 1 }) =>
      tmdb.fetchMovies(category, locale, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchMovies = (
  query: string,
  locale: string,
  page: number = 1,
) => {
  return useQuery({
    queryKey: ["search", query, locale, page],
    queryFn: () => tmdb.searchMovies(query, locale, page),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovieDetails = (id: string, locale: string) => {
  return useQuery({
    queryKey: ["movie", id, locale],
    queryFn: () => tmdb.getMovieDetails(id, locale),
    staleTime: 10 * 60 * 1000,
  });
};
