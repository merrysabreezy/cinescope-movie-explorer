'use client';

import { use, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useMovies, useSearchMovies } from '@/hooks/useMovies';
import MovieCard from '@/components/movies/MovieCard';
import { Search } from 'lucide-react';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
// import LoadingSpinner from "@/components/ui/LoadingSpinner";
// import ErrorMessage from "@/components/ui/ErrorMessage";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('popular');

  const category =
    (searchParams.get('category') as 'popular' | 'top_rated' | 'upcoming') || 'popular';
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1');

  const {
    data: moviesData,
    isLoading,
    error,
    isError,
  } = query ? useSearchMovies(query, locale, page) : useMovies(category, locale, page);

  const categories = [
    { id: 'popular', label: 'Popular' },
    { id: 'top_rated', label: 'Top Rated' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'now_playing', label: 'Now Playing' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          message={error instanceof Error ? error.message : 'Failed to load movies'}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1920')] bg-cover bg-center opacity-30" />

        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-6">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">CineScope</h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Explore thousands of movies from around the world
            </p>

            {/* Search Bar */}
            {/* <div className="max-w-xl mb-12">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search movies, actors, directors..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {/* <Filter size={20} className="text-gray-400" /> */}
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-12" />

        {/* Movies Grid */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-8">
            {query
              ? `Search Results for "${query}"`
              : activeCategory === 'popular'
                ? 'Popular Movies'
                : activeCategory === 'top_rated'
                  ? 'Top Rated Movies'
                  : activeCategory === 'upcoming'
                    ? 'Upcoming Movies'
                    : 'Now Playing'}
          </h3>

          {moviesData?.results && moviesData.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {moviesData.results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg">No movies found</div>
              <p className="text-gray-500 mt-2">Try a different category or search term</p>
            </div>
          )}

          {/* Pagination */}
          {moviesData?.total_pages && moviesData.total_pages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                disabled={moviesData.page <= 1}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Previous
              </button>

              <span className="text-gray-300">
                Page {moviesData.page} of {moviesData.total_pages}
              </span>

              <button
                disabled={moviesData.page >= moviesData.total_pages}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
