'use client';

import { getPosterUrl } from '@/lib/api/config';
import { MovieDetails } from '@/lib/api/types';
import Image from 'next/image';
import MovieDetailsHero from './MovieDetailsHero';
import MovieDetailsInfo from './MovieDetailsInfo';

export default function MovieDetailsPage({ movie }: { movie: MovieDetails }) {
  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <div className="relative pb-10 md:pb-20">
      {/* Hero Backdrop Section */}
      <MovieDetailsHero movie={movie} />

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
              quality={85}
              sizes="(max-width: 768px) 192px, 320px"
            />
          </div>

          {/* Details Column */}
          <MovieDetailsInfo movie={movie} />
        </div>
      </div>
    </div>
  );
}
