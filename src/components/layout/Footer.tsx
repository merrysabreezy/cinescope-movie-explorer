import { Film } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const t = await getTranslations();

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"> */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4">
          {/* Brand Section */}
          <div className="space-y-4 md:w-1/3">
            <div className="flex items-center gap-2 text-primary">
              <Film className="w-5 h-5" />
              <span className="font-display font-bold cinema-gradient-text">CineScope</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">{t('footer.description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-xs">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  {t('home.home')}
                </Link>
              </li>
              <li>
                <Link href="/popular" className="hover:text-primary transition-colors">
                  {t('categories.popular')}
                </Link>
              </li>
              <li>
                <Link href="/top-rated" className="hover:text-primary transition-colors">
                  {t('categories.topRated')}
                </Link>
              </li>
            </ul>
          </div>

          {/* TMDB Attribution (Required by TMDB Terms) */}
          <div className="space-y-4 flex flex-col items-start md:items-end md:text-right md:w-1/3">
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-end gap-3 text-sm  hover:text-cinema-gold transition-colors group"
            >
              {t('footer.poweredBy')}
              <Image
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                alt="TMDB Logo"
                width={154} // Official TMDB logo aspect ratio width
                height={20} // Official TMDB logo aspect ratio height
                loading="lazy"
                className="h-3 md:h-4 w-auto brightness-90 group-hover:brightness-110 transition-all"
              />
            </a>
            <p className="text-xs max-w-sm leading-relaxed">{t('footer.disclaimer')}</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">
              {t('footer.privacyPolicy')}
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              {t('footer.termsOfService')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
