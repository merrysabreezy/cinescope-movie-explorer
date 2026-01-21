"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/lib/api/tmdb";
import { tmdb } from "@/lib/api/tmdb";

interface MovieCardProps {
  movie: Movie;
  locale: string;
}

export default function MovieCard({ movie, locale }: MovieCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: "numeric",
    });
  };

  return (
    <Link href={`/${locale}/movie/${movie.id}`}>
      <div className="group relative overflow-hidden rounded-xl bg-gray-800 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
        {/* Poster Image */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={tmdb.getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Rating Badge */}
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-bold shadow-lg">
            {/* <Star size={14} fill="white" /> */}
            {movie.vote_average.toFixed(1)}
          </div>

          {/* Year Badge */}
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-lg flex items-center gap-1 text-sm">
            {/* <Calendar size={14} /> */}
            {formatDate(movie.release_date)}
          </div>
        </div>

        {/* Movie Info */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-purple-300 transition-colors">
            {movie.title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-2 mb-3">
            {movie.overview || "No description available"}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              {movie.vote_count.toLocaleString()} votes
            </span>

            <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              View Details
            </button>
          </div>
        </div>

        {/* Hover Effect Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </Link>
  );
}
