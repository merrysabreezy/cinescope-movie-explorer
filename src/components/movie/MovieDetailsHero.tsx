'use client';

import { getBackdropUrl } from '@/lib/api/config';
import { MovieDetails } from '@/lib/api/types';
import Image from 'next/image';

interface MovieDetailsHeroProps {
  movie: MovieDetails;
}

export default function MovieDetailsHero({ movie }: MovieDetailsHeroProps) {
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return (
    <div className="relative h-[50vh] md:h-[60vh] w-full">
      <Image
        src={backdropUrl}
        alt={movie.title}
        fill
        priority
        className="object-cover"
        fetchPriority="high"
        sizes="100vw"
        quality={85}
      />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 to-transparent" />
    </div>
  );
}
