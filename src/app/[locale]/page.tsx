import CategoryManager from '@/components/home/CategoryManager';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: `${t('title')} - ${t('subtitle')}`,
    description:
      'Discover and explore movies from around the world. Find popular movies, top-rated films, and get detailed information about your favorite movies.',
    keywords:
      'movies, films, cinema, movie database, movie explorer, TMDB, popular movies, top rated movies',
    openGraph: {
      title: `${t('title')} - ${t('subtitle')}`,
      description: 'Discover and explore movies from around the world',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('title')} - ${t('subtitle')}`,
      description: 'Discover and explore movies from around the world',
    },
  };
}

export default async function Home() {
  const t = await getTranslations('home');

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CineScope',
    description: 'Discover and explore movies from around the world',
    url: 'https://cinescope-movie-explorer.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://cinescope-movie-explorer.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="container mx-auto px-4">
        <section className="relative py-12 md:py-20 text-center max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r text-primary bg-clip-text">{t('title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400">{t('discoverMovies')}</p>
        </section>

        <CategoryManager />
      </div>
    </>
  );
}
