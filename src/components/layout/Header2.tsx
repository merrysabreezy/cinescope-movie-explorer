'use client';

import React, { useState, useCallback } from 'react';
import { Search, Globe, Film, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface HeaderProps {
  locale: string;
}

const Header: React.FC<HeaderProps> = ({ locale }) => {
  const t = useTranslations('Header');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
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

            {/* <div className="max-w-xl mb-12"> */}
            <div className="relative">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            {/* </div> */}

            {/* <form className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // placeholder={t("header.searchPlaceholder")}
                className="w-64 lg:w-80 cinema-input pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                // aria-label={t("common.search")}
              >
                <Search className="w-5 h-5" />
              </button>
            </form> */}

            {/* Language Switcher */}
            <button
              // onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
              // aria-label={t("header.language")}
            >
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">
                {/* {getLanguageDisplayName(language)} */}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            {/* Mobile Search */}
            <form className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  // placeholder={t("header.searchPlaceholder")}
                  className="w-full cinema-input pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  // aria-label={t("common.search")}
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>

            {/* Mobile Language Switcher */}
            <button
              // onClick={toggleLanguage}
              className="flex items-center gap-2 w-full px-3 py-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
            >
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium">{/* {getLanguageDisplayName(language)} */}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
