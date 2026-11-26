import { Language } from '../types';
import pluie from '../assets/images/scene-pluie.jpg';
import pere from '../assets/images/scene-pere.jpg';
import ici from '../assets/images/scene-ici.jpg';
import chef from '../assets/images/scene-chef.jpg';

type L = Record<Language, string>;

export interface Scene {
  id: string;
  img: string;
  alt: string;
  chapter: L;
  // Positie van het gele detail op de foto (in % van breedte/hoogte)
  spot: { x: number; y: number };
  caption: L;
  rain?: boolean;
}

export const YEAR_START = 1957;
export const YEAR_NOW = 2026;

export const HINT: L = {
  fr: 'Touchez le point jaune',
  ar: 'المس النقطة الصفراء',
  en: 'Tap the yellow dot',
};

export const SCENES: Scene[] = [
  {
    id: 'pluie',
    img: pluie,
    alt: 'Un parapluie jaune devant la porte de Ba Fares',
    chapter: { fr: 'Chapitre I', ar: 'الفصل الأول', en: 'Chapter I' },
    spot: { x: 37, y: 53 },
    caption: {
      fr: 'Un petit détail jaune, resté sur le seuil.',
      ar: 'تفصيل أصفر صغير، بقي عند العتبة.',
      en: 'A small yellow detail, left on the doorstep.',
    },
    rain: true,
  },
  {
    id: 'pere',
    img: pere,
    alt: "Un sac d'école et un verre de lait sur le comptoir en marbre",
    chapter: { fr: 'Chapitre II', ar: 'الفصل الثاني', en: 'Chapter II' },
    spot: { x: 39, y: 62 },
    caption: {
      fr: "Le sac d'école, posé comme avant.",
      ar: 'حقيبة المدرسة، موضوعة كما في الماضي.',
      en: 'The school bag, set down like before.',
    },
  },
  {
    id: 'ici',
    img: ici,
    alt: 'Des mains tenant un verre de lait avec une paille jaune',
    chapter: { fr: 'Chapitre III', ar: 'الفصل الثالث', en: 'Chapter III' },
    spot: { x: 33, y: 48 },
    caption: {
      fr: 'Le verre est plein. Comme depuis 1957.',
      ar: 'الكأس ممتلئة، كما منذ 1957.',
      en: 'The glass is full. Just like since 1957.',
    },
  },
  {
    id: 'chef',
    img: chef,
    alt: 'Le chef de Ba Fares derrière trois plats',
    chapter: { fr: 'Chapitre IV', ar: 'الفصل الرابع', en: 'Chapter IV' },
    spot: { x: 14, y: 76 },
    caption: {
      fr: 'Chaque plat a son histoire.',
      ar: 'لكل طبق حكاية.',
      en: 'Every dish has a story.',
    },
  },
];
