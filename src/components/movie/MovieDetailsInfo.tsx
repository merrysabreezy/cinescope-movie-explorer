'use client';

import { MovieDetails } from '@/lib/api/types';
import { useLocale, useTranslations } from 'next-intl';
import { formatCurrency, formatRuntime } from '@/lib/utils';
import { Calendar, Clock, Star } from 'lucide-react';

interface MovieDetailsInfoProps {
  movie: MovieDetails;
}

export default function MovieDetailsInfo({ movie }: MovieDetailsInfoProps) {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex-1 mt-6 md:mt-12">
      {/* Back Button */}
      {/* <button
              onClick={() => router.back()}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 hover:bg-slate-950 transition-all mb-6"
              aria-label={t('common.back')}
            >
              <ArrowLeft className="w-4 h-4" />
              {t('common.back')}
            </button> */}

      <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
        {movie.title}
      </h1>

      {movie.tagline && (
        <p className="text-xl text-cinema-gold italic mb-8 font-light">{`"${movie.tagline}"`}</p>
      )}

      {/* Movie Rating, Runtime, Release Date */}
      <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base">
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-cinema-gold fill-cinema-gold" />
          <span className="font-bold text-white text-lg">{movie.vote_average.toFixed(1)}</span>
          <span className="text-slate-400">({movie.vote_count.toLocaleString()})</span>
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Clock className="w-5 h-5" />
          {formatRuntime(movie.runtime)}
        </div>

        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-5 h-5" />
          {new Date(movie.release_date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
      </div>

      {/* Movie Genres */}
      <div className="flex flex-wrap gap-2 mb-10">
        {movie.genres?.map((g) => (
          <span
            key={g.id}
            className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300"
          >
            {g.name}
          </span>
        ))}
      </div>

      <div className="space-y-6 max-w-3xl">
        {/* Movie Overview Section */}
        <div>
          <h2 className="text-lg font-bold mb-2 uppercase tracking-widest text-cinema-gold/80">
            {t('movie.overview')}
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">{movie.overview}</p>
        </div>

        {/* Budget and Revenue Section */}
        <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
          {movie.budget > 0 && (
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-tighter mb-1">
                {t('movie.budget')}
              </p>
              <p className="text-xl font-bold text-white">{formatCurrency(movie.budget, locale)}</p>
            </div>
          )}

          {movie.revenue > 0 && (
            <div>
              <p className="text-sm text-slate-400 uppercase tracking-tighter mb-1">
                {t('movie.revenue')}
              </p>
              <p className="text-xl font-bold text-white">
                {formatCurrency(movie.revenue, locale)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
