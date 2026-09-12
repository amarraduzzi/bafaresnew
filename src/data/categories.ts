import { CategoryId } from '../types';

export interface CategoryDef {
  id: CategoryId;
  icon: string;
  labelFr: string;
  labelAr: string;
  labelEn: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: 'all', icon: '🍽️', labelFr: 'Tout le menu', labelAr: 'كل القائمة', labelEn: 'Full Menu' },
  { id: 'breakfast', icon: '🥞', labelFr: 'Petit-Déjeuner', labelAr: 'فطور', labelEn: 'Breakfast' },
  { id: 'omelettes', icon: '🍳', labelFr: 'Nos Omelettes', labelAr: 'العجة', labelEn: 'Omelettes' },
  { id: 'harcha_rghifa', icon: '🫓', labelFr: 'Harcha & Rghifa', labelAr: 'حرشة ورغيفة', labelEn: 'Harcha & Rghifa' },
  { id: 'crepes', icon: '🥮', labelFr: 'Crêpes', labelAr: 'كريب', labelEn: 'Crêpes' },
  { id: 'sales', icon: '🥟', labelFr: 'Les Salés', labelAr: 'المملحات', labelEn: 'Savories' },
  { id: 'laitier', icon: '🍮', labelFr: 'Laitier', labelAr: 'منتجات الحليب', labelEn: 'Dairy & Desserts' },
  { id: 'beldi', icon: '🍲', labelFr: 'Beldi', labelAr: 'بلدي', labelEn: 'Beldi' },
  { id: 'juices', icon: '🍊', labelFr: 'Nos Jus', labelAr: 'عصائرنا', labelEn: 'Fresh Juices' },
  { id: 'drinks', icon: '☕', labelFr: 'Nos Boissons', labelAr: 'مشروباتنا', labelEn: 'Drinks' },
  { id: 'supplements', icon: '➕', labelFr: 'Suppléments', labelAr: 'إضافات', labelEn: 'Extras' },
];
