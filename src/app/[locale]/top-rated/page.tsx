'use client';

import { useMoviesByCategory } from '@/lib/api/useMovies';
import MovieGrid from '@/components/movie/MovieGrid';
import Pagination from '@/components/ui/Pagination';
import { useRouter } from '@/lib/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

export default function TopRatedMoviesPage() {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [currentPage, setCurrentPage] = useState(1);

  // Get page from URL params
  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (pageParam) {
      const page = parseInt(pageParam, 10);
      if (page > 0) {
        setCurrentPage(page);
      }
    }
  }, [searchParams]);

  const { data, isLoading, error } = useMoviesByCategory('top_rated', currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Update URL
    const params = new URLSearchParams(searchParams);
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', page.toString());
    }
    const newUrl = params.toString() ? `?${params.toString()}` : '';
    router.replace(`/top-rated${newUrl}`);
  };

  const totalPages = data?.total_pages || 1;

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

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
