import { Link } from '@/lib/i18n/routing';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('errors');

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative">
        <h1 className="text-9xl font-black text-white/10 select-none">404</h1>
      </div>

      <h2 className="mt-8 text-2xl font-semibold text-slate-100">{t('pageNotFound')}</h2>

      <p className="mt-4 max-w-md text-slate-400">{t('networkError')}</p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-cinema-gold px-8 py-3 font-bold text-slate-950 transition-transform hover:scale-105 active:scale-95"
      >
        {t('goBackHome')}
      </Link>
    </div>
  );
}
