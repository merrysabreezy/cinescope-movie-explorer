'use client';

import { Clock, Flame, Play, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { JSX } from 'react';

type MovieCategory = 'popular' | 'top_rated' | 'upcoming' | 'now_playing';

interface CategoryFilterProps {
  activeCategory: MovieCategory;
  onCategoryChange: (category: MovieCategory) => void;
}

const CategoryFilter = ({ activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const t = useTranslations('categories');

  const categories: { key: MovieCategory; icon: JSX.Element; label: string }[] = [
    {
      key: 'popular',
      icon: <Flame className="w-4 h-4" />,
      label: 'popular',
    },
    {
      key: 'top_rated',
      icon: <Star className="w-4 h-4" />,
      label: 'topRated',
    },
    {
      key: 'upcoming',
      icon: <Clock className="w-4 h-4" />,
      label: 'upcoming',
    },
    {
      key: 'now_playing',
      icon: <Play className="w-4 h-4" />,
      label: 'nowPlaying',
    },
  ] as const;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.key;

        return (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key as MovieCategory)}
            aria-pressed={isActive}
            aria-label={t(`${cat.label}`)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm
              whitespace-nowrap transition-all duration-200 cursor-pointer
              ${
                isActive
                  ? 'bg-primary text-slate-950 shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
              }
            `}
          >
            {cat.icon}
            {t(cat.label)}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
