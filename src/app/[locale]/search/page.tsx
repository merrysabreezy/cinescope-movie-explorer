'use client';

import { useSearchMovies } from '@/lib/api/useMovies';
import MovieGrid from '@/components/movie/MovieGrid';
import { useRouter } from '@/lib/i18n/routing';
import { ArrowLeft, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

export default function SearchResultsPage() {
  const t = useTranslations('common');
  const searchParams = useSearchParams();
  const router = useRouter();

  const query = searchParams.get('q') || '';

  const { data, isLoading, error, refetch } = useSearchMovies(query);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 cursor-pointer"
          aria-label={t('back')}
        >
          <ArrowLeft className="w-4 h-4" />
          {t('back')}
        </button>

        <div className="flex items-center gap-3">
          <Search className="w-6 h-6 text-cinema-gold" />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-white">
            {query ? (
              <>
                {t('search')}:{' '}
                <span className="bg-linear-to-r from-cinema-gold to-white bg-clip-text text-transparent">
                  {`"${query}"`}
                </span>
              </>
            ) : (
              t('search')
            )}
          </h1>
        </div>

        {data && (
          <p className="text-slate-400 mt-2">{t('resultsFound', { count: data.total_results })}</p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-20 bg-slate-900/50 rounded-2xl border border-dashed border-white/10">
          <Search className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-400">{t('enterSearchTerm')}</p>
        </div>
      ) : (
        <MovieGrid
          movies={data?.results}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
        />
      )}
    </div>
  );
}
