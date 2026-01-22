import Image from 'next/image';
import { Star } from 'lucide-react';
import { Link } from '@/lib/i18n/routing';
import { Movie } from '@/lib/api/types';
import { getPosterUrl } from '@/lib/api/config';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  const rating = movie.vote_average.toFixed(1);

  const posterUrl = getPosterUrl(movie.poster_path);

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="group relative block rounded-xl bg-slate-900 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cinema-gold-glow/20"
    >
      <div className="relative aspect-2/3 w-full overflow-hidden">
        <Image
          src={posterUrl}
          alt={movie.title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          quality={'60'}
        />

        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-md bg-slate-950/80 backdrop-blur-sm border border-white/10">
          <Star className="w-3.5 h-3.5 text-cinema-gold fill-cinema-gold" />
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-3 relative z-10">
        <h3 className="font-display font-semibold text-white line-clamp-1 group-hover:text-cinema-gold transition-colors">
          {movie.title}
        </h3>
        <p className="text-xs text-slate-400 mt-1">{year}</p>
      </div>
    </Link>
  );
};

export const MovieCardSkeleton = () => {
  return (
    <div className="rounded-xl bg-slate-900 overflow-hidden">
      <div className="aspect-2/3 bg-slate-800 animate-pulse" />
      <div className="p-3 space-y-2">
        <div className="h-5 bg-slate-800 rounded animate-pulse" />
        <div className="h-4 w-16 bg-slate-800 rounded animate-pulse" />
      </div>
    </div>
  );
};

export default MovieCard;
