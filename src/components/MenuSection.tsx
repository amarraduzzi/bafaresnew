import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Info, Utensils, CalendarClock } from 'lucide-react';
import { CategoryId, Language } from '../types';
import { MENU_ITEMS } from '../data/menuData';
import { CATEGORIES } from '../data/categories';
import { translations } from '../data/translations';

interface MenuSectionProps {
  lang: Language;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ lang }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const t = translations[lang];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        item.nameFr.toLowerCase().includes(query) ||
        item.nameAr.includes(query) ||
        item.nameEn.toLowerCase().includes(query) ||
        (item.descFr ?? '').toLowerCase().includes(query) ||
        (item.descAr ?? '').includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Group filtered items by category, preserving the CATEGORIES display order.
  const groupedItems = useMemo(() => {
    const groups: { category: CategoryId; items: typeof MENU_ITEMS }[] = [];
    for (const cat of CATEGORIES) {
      if (cat.id === 'all') continue;
      const items = filteredItems.filter((item) => item.category === cat.id);
      if (items.length > 0) groups.push({ category: cat.id, items });
    }
    return groups;
  }, [filteredItems]);

  const categoryLabel = (id: CategoryId) => {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return '';
    return lang === 'ar' ? cat.labelAr : lang === 'en' ? cat.labelEn : cat.labelFr;
  };

  return (
    <section id="menu" className="py-20 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFDF9] border border-[#EADBC4] text-xs font-bold text-[#D8A517] shadow-2xs">
            <Utensils className="w-3.5 h-3.5" />
            <span>Savoir-faire 1957</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#3B1F0F] font-serif tracking-tight">
            {t.menu.title}
          </h2>

          <p className="text-base sm:text-lg text-[#8C5E3C]">
            {t.menu.subtitle}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F2E9D8] border border-[#EADBC4] text-xs font-medium text-[#3B1F0F]">
            <Info className="w-4 h-4 text-[#D8A517] shrink-0" />
            <span>{t.menu.notice}</span>
          </div>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-6 mb-12">

          <div className="max-w-md mx-auto relative">
            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto pl-3.5 rtl:pr-3.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#8C5E3C]" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.menu.searchPlaceholder}
              className="w-full pl-10 rtl:pr-10 rtl:pl-3.5 pr-4 py-3 bg-[#FFFDF9] border border-[#EADBC4] focus:border-[#F2C230] focus:ring-2 focus:ring-[#F2C230]/30 rounded-2xl text-sm text-[#3B1F0F] placeholder-[#8C5E3C]/60 shadow-xs outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 rtl:left-0 rtl:right-auto pr-3 rtl:pl-3 flex items-center text-xs text-[#8C5E3C] hover:text-[#3B1F0F]"
              >
                Effacer
              </button>
            )}
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 focus:outline-none shrink-0 ${
                    isActive
                      ? 'bg-[#F2C230] text-[#3B1F0F] shadow-md transform -translate-y-0.5'
                      : 'bg-[#FFFDF9] text-[#3B1F0F]/80 border border-[#EADBC4] hover:bg-[#F2E9D8] hover:border-[#F2C230]/50'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{lang === 'ar' ? cat.labelAr : lang === 'en' ? cat.labelEn : cat.labelFr}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Menu Items — text-only list, grouped by category */}
        {groupedItems.length === 0 ? (
          <div className="text-center py-16 bg-[#FFFDF9] rounded-3xl border border-[#EADBC4] p-8 max-w-md mx-auto">
            <p className="text-base font-bold text-[#3B1F0F]">
              {lang === 'ar' ? 'لم يتم العثور على أطباق مطابقة للبحث' : 'Aucun plat ne correspond à votre recherche'}
            </p>
            <p className="text-xs text-[#8C5E3C] mt-2">
              {lang === 'ar' ? 'يرجى تغيير كلمة البحث أو اختيار تصنيف آخر.' : 'Essayez un autre mot-clé ou sélectionnez une autre catégorie.'}
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#F2C230] text-[#3B1F0F]"
            >
              Réinitialiser
            </button>
          </div>
        ) : (
          <div className="space-y-10">
            {groupedItems.map((group, groupIndex) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: groupIndex * 0.05 }}
                className="bg-[#FFFDF9] rounded-3xl border-2 border-[#EADBC4] shadow-sm overflow-hidden"
              >
                <div className="px-6 sm:px-8 py-4 border-b border-[#EADBC4] bg-[#F2E9D8]/50">
                  <h3 className="text-lg sm:text-xl font-black text-[#3B1F0F] font-serif flex items-center gap-2">
                    <span>{CATEGORIES.find((c) => c.id === group.category)?.icon}</span>
                    <span>{categoryLabel(group.category)}</span>
                  </h3>
                </div>

                <ul className="divide-y divide-[#EADBC4]/60">
                  {group.items.map((item) => {
                    const name = lang === 'ar' ? item.nameAr : lang === 'en' ? item.nameEn : item.nameFr;
                    const desc = lang === 'ar' ? item.descAr : lang === 'en' ? item.descEn : item.descFr;

                    return (
                      <li
                        key={item.id}
                        className="px-6 sm:px-8 py-4 flex items-start justify-between gap-4 text-start hover:bg-[#FAF6EE] transition-colors"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                            <span className="text-sm sm:text-base font-bold text-[#3B1F0F]">
                              {name}
                            </span>
                            {lang !== 'ar' && (
                              <span className="text-xs font-semibold text-[#8C5E3C]" dir="rtl">
                                {item.nameAr}
                              </span>
                            )}
                            {item.note && (
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-[#D8A517] bg-[#F2C230]/15 px-2 py-0.5 rounded-full">
                                <CalendarClock className="w-3 h-3" />
                                {item.note}
                              </span>
                            )}
                          </div>
                          {desc && (
                            <p className="text-xs text-[#5A321B]/80 mt-1 leading-relaxed">
                              {desc}
                            </p>
                          )}
                        </div>

                        <div className="shrink-0 font-black text-sm sm:text-base text-[#D8A517] font-serif whitespace-nowrap">
                          {item.price} {t.menu.dh}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
