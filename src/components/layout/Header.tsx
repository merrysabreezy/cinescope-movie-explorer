'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
// import SearchBar from "./SearchBar";
// import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  locale: string;
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('Header');
  const [activeFilter, setActiveFilter] = useState('popular');

  const filters = [
    { key: 'popular', label: t('popular') },
    { key: 'top_rated', label: t('topRated') },
    { key: 'upcoming', label: t('upcoming') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Logo and Navigation */}
          <div className="flex items-center justify-between md:justify-start gap-8">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-r from-primary-600 to-primary-500 rounded-lg" />
              <span className="text-2xl font-bold text-primary">{t('logo')}</span>
            </Link>
            <div className="text-primary">HELLO</div>
            <nav className="hidden md:flex items-center gap-6">
              {filters.map((filter) => (
                <Link
                  key={filter.key}
                  href={`/${locale}?category=${filter.key}`}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    activeFilter === filter.key
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveFilter(filter.key)}
                >
                  {filter.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Search and Language Switcher */}
          <div className="flex items-center gap-4">
            {/* <SearchBar placeholder={t("searchPlaceholder")} locale={locale} />
            <LanguageSwitcher currentLocale={locale} /> */}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center gap-2 mt-4 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Link
              key={filter.key}
              href={`/${locale}?category=${filter.key}`}
              className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeFilter === filter.key
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
