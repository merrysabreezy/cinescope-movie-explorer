import CategoryManager from '@/components/home/CategoryManager';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: `${t('title')} - ${t('subtitle')}`,
  };
}

export default async function Home() {
  const t = await getTranslations('home');

  return (
    <div className="container mx-auto px-4">
      <section className="relative py-12 md:py-20 text-center max-w-3xl mx-auto">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          <span className="bg-linear-to-r text-primary bg-clip-text">{t('title')}</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400">{t('discoverMovies')}</p>
      </section>

      <CategoryManager />
    </div>
  );
}
