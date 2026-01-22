'use client';

import { useMoviesByCategory } from '@/lib/api/useMovies';
import MovieGrid from '@/components/home/MovieGrid';
import { useRouter } from '@/lib/i18n/routing';
import { ArrowLeft, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TopRatedMoviesPage() {
  const t = useTranslations();
  const router = useRouter();

  const { data, isLoading, error } = useMoviesByCategory('top_rated');

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
          aria-label={t('common.back')}
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>

        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-cinema-gold" />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            {t('categories.topRated')}
          </h1>
        </div>

        {data && (
          <p className="text-slate-400 mt-2">
            {t('common.resultsFound', { count: data.total_results })}
          </p>
        )}
      </div>

      <MovieGrid
        movies={data?.results || []}
        isLoading={isLoading}
        error={error}
        onRetry={() => window.location.reload()}
      />
    </div>
  );
}
