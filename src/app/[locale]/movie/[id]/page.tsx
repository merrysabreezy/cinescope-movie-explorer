import { Metadata } from 'next';
import MovieDetailsPage from '@/components/movie/MovieDetailsPage';
import { fetchMovieDetails } from '@/lib/api/movies';
import { getBackdropUrl } from '@/lib/api/config';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const movieId = parseInt(id, 10); // Ensuring it's a number
  const movie = await fetchMovieDetails(movieId, locale);
  const backdropUrl = getBackdropUrl(movie.backdrop_path);

  return {
    title: `${movie.title} | CineScope`,
    description: movie.overview,
    openGraph: {
      images: [backdropUrl],
    },
  };
}

export default async function MoviePage({ params }: Props) {
  const { id, locale } = await params;
  const movieId = parseInt(id, 10);
  const movie = await fetchMovieDetails(movieId, locale);

  return <MovieDetailsPage movie={movie} />;
}
