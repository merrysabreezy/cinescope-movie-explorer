'use client';

import { getBackdropUrl, getPosterUrl } from '@/lib/api/config';
import { MovieDetails } from '@/lib/api/types';
import { useRouter } from '@/lib/i18n/routing';
import { formatCurrency, formatRuntime } from '@/lib/utils';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

export default function MovieDetailsPage({ movie }: { movie: MovieDetails }) {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();

  const posterUrl = getPosterUrl(movie.poster_path);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return (
    <div className="relative pb-20">
      {/* Hero Backdrop Section */}
      <div className="relative h-[50vh] md:h-[70vh] w-full">
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 to-transparent" />

        <button
          onClick={() => router.back()}
          className="absolute top-8 left-4 md:left-8 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10 hover:bg-slate-950 transition-all z-20"
          aria-label={t('common.back')}
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.back')}
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-40 md:-mt-56 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Poster Column */}
          <div className="w-48 md:w-80 shrink-0 mx-auto md:mx-0 shadow-2xl rounded-2xl overflow-hidden ring-1 ring-white/10 bg-slate-900 flex">
            <Image
              src={posterUrl}
              alt={movie.title}
              width={500}
              height={750}
              priority
              className="w-full h-full aspect-2/3 object-cover"
            />
          </div>

          {/* Details Column */}
          <div className="flex-1 mt-6 md:mt-12">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 leading-tight">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-xl text-cinema-gold italic mb-8 font-light">
                {`"${movie.tagline}"`}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-cinema-gold fill-cinema-gold" />
                <span className="font-bold text-white text-lg">
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className="text-slate-400">({movie.vote_count.toLocaleString()})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-5 h-5" />
                {formatRuntime(movie.runtime)}
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-5 h-5" />
                {new Date(movie.release_date).toLocaleDateString(
                  locale === 'es' ? 'es-ES' : 'en-US',
                  { year: 'numeric', month: 'long', day: 'numeric' }
                )}
              </div>
            </div>

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
              <div>
                <h2 className="text-lg font-bold mb-2 uppercase tracking-widest text-cinema-gold/80">
                  {t('movie.overview')}
                </h2>
                <p className="text-slate-300 leading-relaxed text-lg">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                {movie.budget > 0 && (
                  <div>
                    <p className="text-sm text-slate-400 uppercase tracking-tighter mb-1">
                      {t('movie.budget')}
                    </p>
                    <p className="text-xl font-bold text-white">
                      {formatCurrency(movie.budget, locale)}
                    </p>
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
        </div>
      </div>
    </div>
  );
}

//   const { data: movie, isLoading, error } = useMovieDetails(id ? parseInt(id) : undefined);
// if (isLoading) return <MovieDetailsSkeleton />;
// if (error || !movie) {
//   return (
//     <div className="container mx-auto px-4 py-20 text-center">
//       <Film className="w-16 h-16 text-slate-700 mx-auto mb-4" />
//       <h1 className="text-2xl font-bold text-white">{t('errors.movieNotFound')}</h1>
//       <button
//         onClick={() => router.push('/')}
//         className="mt-6 text-cinema-gold hover:underline"
//         aria-label={t('common.back')}
//       >
//         {t('common.back')}
//       </button>
//     </div>
//   );
// }
// function MovieDetailsSkeleton() {
//   return (
//     <div className="animate-pulse pb-20">
//       <div className="h-[50vh] bg-slate-900" />
//       <div className="container mx-auto px-4 -mt-32 flex flex-col md:flex-row gap-10">
//         <div className="w-48 md:w-80 aspect-[2/3] bg-slate-800 rounded-2xl" />
//         <div className="flex-1 space-y-4 pt-12">
//           <div className="h-12 w-3/4 bg-slate-800 rounded" />
//           <div className="h-6 w-1/4 bg-slate-800 rounded" />
//           <div className="h-32 bg-slate-800 rounded" />
//         </div>
//       </div>
//     </div>
//   );
// }
