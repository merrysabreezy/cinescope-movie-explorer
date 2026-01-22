'use client';

import React, { useState, useCallback } from 'react';
import { Search, Globe, Film, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/lib/i18n/routing';
import { useSearchParams } from 'next/navigation';

const Header: React.FC = () => {
  const locale = useLocale();
  const t = useTranslations('header');
  const c = useTranslations('common');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        // handle search params
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
        setIsMobileMenuOpen(false);
      }
    },
    [searchQuery, router]
  );

  const toggleLanguage = () => {
    const newLocale = locale === 'en' ? 'es' : 'en';
    const queryString = searchParams.toString();
    const newPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(newPath, { locale: newLocale });
  };

  const languageDisplayName = locale === 'en' ? 'English' : 'Español';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="relative">
              <Film className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="font-display text-xl md:text-2xl font-bold cinema-gradient-text text-primary">
              {t('logo')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('searchPlaceholder')}
                className="w-64 lg:w-80 px-4 py-2 rounded-full bg-slate-900 border border-white/10 focus:border-cinema-gold focus:ring-1 focus:ring-cinema-gold outline-none transition-all"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <Globe className="w-4 h-4 text-cinema-gold" />
              <span className="text-sm font-medium text-white">{languageDisplayName}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-in fade-in slide-in-from-top-2">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('searchPlaceholder')}
                  className="w-full px-4 py-2 rounded-full bg-slate-900 border border-white/10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={c('search')}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-xl bg-slate-800"
            >
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium text-white">{languageDisplayName}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
