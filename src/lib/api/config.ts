// TMDB API Configuration
export const TMDB_CONFIG = {
  API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY || '',
  BASE_URL: process.env.NEXT_PUBLIC_TMDB_BASE_URL,
  IMAGE_BASE_URL: process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL,
} as const;

export const POSTER_SIZES = {
  SMALL: 'w185',
  MEDIUM: 'w342',
  LARGE: 'w500',
  XLARGE: 'w780',
  ORIGINAL: 'original',
} as const;

export const BACKDROP_SIZES = {
  SMALL: 'w300',
  MEDIUM: 'w780',
  LARGE: 'w1280',
  ORIGINAL: 'original',
} as const;

export const getPosterUrl = (
  path: string | null,
  size: keyof typeof POSTER_SIZES = 'MEDIUM'
): string => {
  if (!path) {
    return '/placeholder.svg';
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${POSTER_SIZES[size]}${path}`;
};

export const getBackdropUrl = (
  path: string | null,
  size: keyof typeof BACKDROP_SIZES = 'LARGE'
): string => {
  if (!path) {
    return '/placeholder.svg';
  }
  return `${TMDB_CONFIG.IMAGE_BASE_URL}/${BACKDROP_SIZES[size]}${path}`;
};

export const createApiUrl = (
  endpoint: string,
  params: Record<string, string | number> = {}
): string => {
  const url = new URL(`${TMDB_CONFIG.BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', TMDB_CONFIG.API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, String(value));
  });

  return url.toString();
};
