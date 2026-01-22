'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { MovieCategory } from '@/lib/api/types';
import { useMoviesByCategory } from '@/lib/api/useMovies';
import CategoryFilter from './CategoryFilter';
import MovieGrid from '../movie/MovieGrid';
import Pagination from '../ui/Pagination';

export default function CategoryManager() {
  const [category, setCategory] = useState<MovieCategory>('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = useMoviesByCategory(category, currentPage);
  const t = useTranslations('movie');

  // Reset to page 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalPages = data?.total_pages || 1;

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {data && (
        <div className="py-8 text-center text-slate-400">
          <p>{t('moviesFound', { count: data.total_results })}</p>
        </div>
      )}
    </section>
  );
}
