const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
  runtime?: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const tmdb = {
  async fetchMovies(
    category: "popular" | "top_rated" | "upcoming" = "popular",
    language: string = "en-US",
    page: number = 1,
  ): Promise<MovieListResponse> {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${category}?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return response.json();
  },

  async searchMovies(
    query: string,
    language: string = "en-US",
    page: number = 1,
  ): Promise<MovieListResponse> {
    if (!query.trim())
      return { page: 1, results: [], total_pages: 0, total_results: 0 };

    const response = await fetch(
      `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    return response.json();
  },

  async getMovieDetails(
    id: string,
    language: string = "en-US",
  ): Promise<Movie> {
    const response = await fetch(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=credits`,
      { next: { revalidate: 3600 } },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie details");
    }

    return response.json();
  },

  getImageUrl(path: string | null, size: "w500" | "original" = "w500"): string {
    if (!path) return "/placeholder-image.jpg";
    return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
  },
};
