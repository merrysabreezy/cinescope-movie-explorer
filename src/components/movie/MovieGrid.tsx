'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MovieCard, { MovieCardSkeleton } from './MovieCard';

import { Movie } from '@/lib/api/types';

interface MovieGridProps {
  movies?: Movie[];
  isLoading?: boolean;
  error?: Error | null;
  onRetry?: () => void;
}

const SKELETON_COUNT = 10;

export default function MovieGrid({ movies, isLoading, error, onRetry }: MovieGridProps) {
  const t = useTranslations('common');

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold mb-2">{t('error')}</h3>
        <p className="text-slate-400 mb-6 max-w-sm">{error.message || 'Failed to fetch movies'}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            aria-label={t('retry')}
            className="flex items-center gap-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t('retry')}
          </button>
        )}
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 text-lg">{t('noResults')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
