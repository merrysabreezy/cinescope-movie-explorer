'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { MovieCategory } from '@/lib/api/types';
import { useMoviesByCategory } from '@/lib/api/useMovies';
import CategoryFilter from './CategoryFilter';
import MovieGrid from './MovieGrid';

export default function CategoryManager() {
  const [category, setCategory] = useState<MovieCategory>('popular');
  const { data, isLoading, error, refetch } = useMoviesByCategory(category);
  const t = useTranslations('movie');

  return (
    <section>
      <div className="flex justify-center mb-8">
        <CategoryFilter activeCategory={category} onCategoryChange={setCategory} />
      </div>

      <MovieGrid
        movies={data?.results}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
      />

      {data && (
        <div className="py-8 text-center text-slate-400">
          <p>{t('moviesFound', { count: data.total_results })}</p>
        </div>
      )}
    </section>
  );
}
