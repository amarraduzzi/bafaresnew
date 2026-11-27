import { MenuItem } from '../types';

// ============================================================
// MENU — transcribed from the in-house paper menu (Ba Fares).
// Prices in MAD (DH). No photos — text only, per house request.
// ============================================================
export const MENU_ITEMS: MenuItem[] = [
  // ---------------- PETIT DÉJEUNER ----------------
  {
    id: 'sbah-mbrouk',
    nameFr: 'Sbah Mbrouk',
    nameAr: 'صباح مبروك',
    nameEn: 'Sbah Mbrouk',
    descFr: "Harcha, rghaif, jben, miel, olive, jus d'orange, boisson chaude, belboula, bouteille d'eau.",
    descAr: 'حرشة، رغايف، جبن، عسل، زيتون، عصير برتقال، مشروب ساخن، بلبولة، قنينة ماء.',
    descEn: "Harcha, rghaif, cheese, honey, olives, orange juice, hot drink, belboula, bottle of water.",
    category: 'breakfast',
    price: 42,
  },
  {
    id: 'chamali',
    nameFr: 'Chamali',
    nameAr: 'شمالي',
    nameEn: 'Chamali',
    descFr: "2 œufs au plat, charcuterie, jben, miel, olive noire, jus d'orange, belboula, bouteille d'eau.",
    descAr: 'بيضتان مقليتان، شاركوتري، جبن، عسل، زيتون أسود، عصير برتقال، بلبولة، قنينة ماء.',
    descEn: "2 fried eggs, cold cuts, cheese, honey, black olives, orange juice, belboula, bottle of water.",
    category: 'breakfast',
    price: 44,
  },
  {
    id: 'berbere',
    nameFr: 'Berbère',
    nameAr: 'بربري',
    nameEn: 'Berbère',
    descFr: "Omelette (taktouka), jben, miel, olive, jus d'orange, boisson chaude, belboula, bouteille d'eau.",
    descAr: 'عجة (تكتوكة)، جبن، عسل، زيتون، عصير برتقال، مشروب ساخن، بلبولة، قنينة ماء.',
    descEn: "Omelette (taktouka), cheese, honey, olives, orange juice, hot drink, belboula, bottle of water.",
    category: 'breakfast',
    price: 45,
  },
  {
    id: 'fassi',
    nameFr: 'Fassi',
    nameAr: 'فاسي',
    nameEn: 'Fassi',
    descFr: "Tajine khlii, jben, miel, olive, jus d'orange, boisson chaude, belboula, bouteille d'eau.",
    descAr: 'طاجين خليع، جبن، عسل، زيتون، عصير برتقال، مشروب ساخن، بلبولة، قنينة ماء.',
    descEn: "Khlii tagine, cheese, honey, olives, orange juice, hot drink, belboula, bottle of water.",
    category: 'breakfast',
    price: 49,
  },
  {
    id: 'ba-fares',
    nameFr: 'Ba Fares',
    nameAr: 'با فارس',
    nameEn: 'Ba Fares',
    descFr: "Omelette au choix (nature, fromage ou berbère), harcha, rghaif, jben, miel, olive, jus d'orange, boisson chaude, belboula, bouteille d'eau.",
    descAr: 'عجة حسب الاختيار (طبيعية، بالجبن أو بربرية)، حرشة، رغايف، جبن، عسل، زيتون، عصير برتقال، مشروب ساخن، بلبولة، قنينة ماء.',
    descEn: "Omelette of your choice (plain, cheese or berbère), harcha, rghaif, cheese, honey, olives, orange juice, hot drink, belboula, bottle of water.",
    category: 'breakfast',
    price: 55,
  },

  // ---------------- NOS OMELETTES ----------------
  { id: 'omelette-nature', nameFr: 'Omelette Nature', nameAr: 'عجة طبيعية', nameEn: 'Plain Omelette', category: 'omelettes', price: 18 },
  { id: 'omelette-fromage', nameFr: 'Omelette Fromage', nameAr: 'عجة بالجبن', nameEn: 'Cheese Omelette', category: 'omelettes', price: 24 },
  { id: 'omelette-fromage-luncheon', nameFr: 'Omelette Fromage Luncheon', nameAr: 'عجة بالجبن واللونشون', nameEn: 'Cheese & Luncheon Omelette', category: 'omelettes', price: 28 },
  { id: 'omelette-khlii', nameFr: 'Omelette Khlii (Tajine)', nameAr: 'عجة بالخليع (طاجين)', nameEn: 'Khlii Omelette (Tagine)', category: 'omelettes', price: 32 },
  { id: 'omelette-taktouka', nameFr: 'Omelette (Taktouka)', nameAr: 'عجة (تكتوكة)', nameEn: 'Omelette (Taktouka)', category: 'omelettes', price: 24 },
  { id: 'omelette-luncheon', nameFr: 'Omelette Luncheon', nameAr: 'عجة باللونشون', nameEn: 'Luncheon Omelette', category: 'omelettes', price: 24 },
  { id: 'omelette-epinard', nameFr: 'Omelette Épinard', nameAr: 'عجة بالسبانخ', nameEn: 'Spinach Omelette', category: 'omelettes', price: 24 },

  // ---------------- HARCHA ET RGHIFA ----------------
  { id: 'harcha-jben-fromage-rouge', nameFr: 'Harcha Jben et Fromage Rouge', nameAr: 'حرشة بالجبن والجبن الأحمر', nameEn: 'Harcha with Cheese & Red Cheese', category: 'harcha_rghifa', price: 16 },
  { id: 'harcha-nutella', nameFr: 'Harcha Nutella', nameAr: 'حرشة بالنوتيلا', nameEn: 'Harcha with Nutella', category: 'harcha_rghifa', price: 12 },
  { id: 'harcha-beurre-miel', nameFr: 'Harcha avec Beurre et Miel', nameAr: 'حرشة بالزبدة والعسل', nameEn: 'Harcha with Butter & Honey', category: 'harcha_rghifa', price: 10 },
  { id: 'rghifa-jben-fromage-rouge', nameFr: 'Rghifa Jben et Fromage Rouge', nameAr: 'رغيفة بالجبن والجبن الأحمر', nameEn: 'Rghifa with Cheese & Red Cheese', category: 'harcha_rghifa', price: 18 },
  { id: 'rghifa-nutella', nameFr: 'Rghifa Nutella', nameAr: 'رغيفة بالنوتيلا', nameEn: 'Rghifa with Nutella', category: 'harcha_rghifa', price: 14 },
  { id: 'rghifa-khlii', nameFr: 'Rghifa avec Khlii', nameAr: 'رغيفة بالخليع', nameEn: 'Rghifa with Khlii', category: 'harcha_rghifa', price: 9 },
  { id: 'rghifa-beurre-miel', nameFr: 'Rghifa avec Beurre et Miel', nameAr: 'رغيفة بالزبدة والعسل', nameEn: 'Rghifa with Butter & Honey', category: 'harcha_rghifa', price: 12 },
  { id: 'rghifa-kiri-luncheon', nameFr: 'Rghifa avec Kiri Luncheon', nameAr: 'رغيفة بجبنة كيري ولونشون', nameEn: 'Rghifa with Kiri Cheese & Luncheon', category: 'harcha_rghifa', price: 15 },
  { id: 'rghifa-fromage-rouge-luncheon', nameFr: 'Rghifa au Fromage Rouge et Luncheon', nameAr: 'رغيفة بالجبن الأحمر واللونشون', nameEn: 'Rghifa with Red Cheese & Luncheon', category: 'harcha_rghifa', price: 20 },
  { id: 'rghifa-jben-luncheon', nameFr: 'Rghifa au Jben et Luncheon', nameAr: 'رغيفة بالجبن واللونشون', nameEn: 'Rghifa with Cheese & Luncheon', category: 'harcha_rghifa', price: 17 },
  { id: 'rghifa-fromage-rouge', nameFr: 'Rghifa au Fromage Rouge', nameAr: 'رغيفة بالجبن الأحمر', nameEn: 'Rghifa with Red Cheese', category: 'harcha_rghifa', price: 16 },

  // ---------------- CRÊPES SALÉES & SUCRÉES ----------------
  { id: 'crepe-nutella', nameFr: 'Crêpe Nutella', nameAr: 'كريب بالنوتيلا', nameEn: 'Nutella Crêpe', category: 'crepes', price: 25 },
  { id: 'crepe-nutella-banane', nameFr: 'Crêpe Nutella Banane', nameAr: 'كريب بالنوتيلا والموز', nameEn: 'Nutella & Banana Crêpe', category: 'crepes', price: 30 },
  { id: 'crepe-oreo', nameFr: 'Crêpe Oreo', nameAr: 'كريب أوريو', nameEn: 'Oreo Crêpe', category: 'crepes', price: 30 },
  { id: 'crepe-kunafa-pistache', nameFr: 'Crêpe Kunafa Pistache', nameAr: 'كريب بالكنافة والفستق', nameEn: 'Kunafa & Pistachio Crêpe', category: 'crepes', price: 35 },
  { id: 'crepe-poulet', nameFr: 'Crêpe Poulet', nameAr: 'كريب بالدجاج', nameEn: 'Chicken Crêpe', category: 'crepes', price: 35 },
  { id: 'crepe-fromage-charcuterie', nameFr: 'Crêpe Fromage Charcuterie', nameAr: 'كريب بالجبن والشاركوتري', nameEn: 'Cheese & Cold Cuts Crêpe', category: 'crepes', price: 38 },

  // ---------------- LES SALÉS ----------------
  { id: 'briwat-poulet-citron', nameFr: 'Briwat Poulet Citron', nameAr: 'بريوات بالدجاج والليمون', nameEn: 'Chicken & Lemon Briwat', category: 'sales', price: 16 },
  { id: 'pastilla-fruits-de-mer', nameFr: 'Pastilla Fruits de Mer', nameAr: 'بسطيلة بالمأكولات البحرية', nameEn: 'Seafood Pastilla', category: 'sales', price: 30 },
  { id: 'pastilla-poulet', nameFr: 'Pastilla Poulet', nameAr: 'بسطيلة بالدجاج', nameEn: 'Chicken Pastilla', category: 'sales', price: 25 },
  { id: 'tranche-pizza', nameFr: 'Tranche Pizza', nameAr: 'قطعة بيتزا', nameEn: 'Pizza Slice', category: 'sales', price: 14 },
  { id: 'quiche', nameFr: 'Quiche', nameAr: 'كيش', nameEn: 'Quiche', category: 'sales', price: 13 },
  { id: 'sandwich-poulet-epinard', nameFr: 'Sandwich Poulet + Épinard', nameAr: 'سندويتش بالدجاج والسبانخ', nameEn: 'Chicken & Spinach Sandwich', category: 'sales', price: 23 },
  { id: 'nems-poulet-epinard-fromage', nameFr: 'Nems Poulet Épinard Fromage', nameAr: 'نيمس بالدجاج والسبانخ والجبن', nameEn: 'Chicken, Spinach & Cheese Nems', category: 'sales', price: 16 },
  { id: 'nems-viande-hachee', nameFr: 'Nems Viande Hachée', nameAr: 'نيمس باللحم المفروم', nameEn: 'Minced Meat Nems', category: 'sales', price: 16 },

  // ---------------- LAITIER ----------------
  { id: 'mhalabia', nameFr: 'Mhalabia', nameAr: 'محلبية', nameEn: 'Mhalabia', category: 'laitier', price: 15 },
  { id: 'yaourt-fruit', nameFr: 'Yaourt Fruit', nameAr: 'ياغورت بالفواكه', nameEn: 'Fruit Yogurt', category: 'laitier', price: 10 },
  { id: 'yaourt-bafares', nameFr: 'Yaourt Bafares', nameAr: 'ياغورت با فارس', nameEn: 'Bafares Yogurt', descFr: "Avec fleur d'oranger.", descAr: 'بماء الزهر.', descEn: 'With orange blossom water.', category: 'laitier', price: 9 },
  { id: 'rayeb-chantilly', nameFr: 'Rayeb Avec Chantilly', nameAr: 'ريب بالشانتيي', nameEn: 'Rayeb with Whipped Cream', category: 'laitier', price: 9 },
  { id: 'zabadi', nameFr: 'Zabadi', nameAr: 'زبادي', nameEn: 'Zabadi', category: 'laitier', price: 8 },
  { id: 'konafa-creme', nameFr: 'Konafa à la Crème', nameAr: 'كنافة بالكريمة', nameEn: 'Konafa with Cream', category: 'laitier', price: 15 },
  { id: 'flan-caramel', nameFr: 'Flan Caramel', nameAr: 'فلان بالكراميل', nameEn: 'Caramel Flan', category: 'laitier', price: 9 },
  { id: 'cheese-cake', nameFr: 'Cheese Cake', nameAr: 'تشيز كيك', nameEn: 'Cheese Cake', category: 'laitier', price: 15 },

  // ---------------- BELDI ----------------
  { id: 'harira-complet', nameFr: 'Harira Complet', nameAr: 'حريرة كاملة', nameEn: 'Full Harira', category: 'beldi', price: 15, note: 'Chaque soir' },
  { id: 'rfissa', nameFr: 'Rfissa', nameAr: 'رفيسة', nameEn: 'Rfissa', category: 'beldi', price: 60, note: 'Chaque mercredi' },
  { id: 'couscous-poulet', nameFr: 'Couscous Poulet', nameAr: 'كسكس بالدجاج', nameEn: 'Chicken Couscous', category: 'beldi', price: 55, note: 'Chaque vendredi' },
  { id: 'couscous-viande', nameFr: 'Couscous Viande', nameAr: 'كسكس باللحم', nameEn: 'Meat Couscous', category: 'beldi', price: 60, note: 'Chaque vendredi' },

  // ---------------- NOS JUS ----------------
  { id: 'jus-orange', nameFr: 'Orange', nameAr: 'برتقال', nameEn: 'Orange', category: 'juices', price: 18 },
  { id: 'jus-carotte', nameFr: 'Carotte', nameAr: 'جزر', nameEn: 'Carrot', category: 'juices', price: 22 },
  { id: 'jus-banane', nameFr: 'Banane', nameAr: 'موز', nameEn: 'Banana', category: 'juices', price: 18 },
  { id: 'jus-pomme', nameFr: 'Pomme', nameAr: 'تفاح', nameEn: 'Apple', category: 'juices', price: 18 },
  { id: 'jus-fraise', nameFr: 'Fraise', nameAr: 'فريز', nameEn: 'Strawberry', category: 'juices', price: 25 },
  { id: 'jus-panache', nameFr: 'Panaché', nameAr: 'بناشي', nameEn: 'Mixed Fruit', category: 'juices', price: 25 },
  { id: 'jus-ananas', nameFr: 'Ananas', nameAr: 'أناناس', nameEn: 'Pineapple', category: 'juices', price: 25 },
  { id: 'jus-mangue', nameFr: 'Mangue', nameAr: 'مانجو', nameEn: 'Mango', category: 'juices', price: 25 },
  { id: 'jus-panache-fruit-sec', nameFr: 'Panaché Fruit Sec', nameAr: 'بناشي بالفواكه الجافة', nameEn: 'Mixed Fruit with Dry Fruit', category: 'juices', price: 30 },
  { id: 'jus-avocat', nameFr: 'Avocat', nameAr: 'أفوكادو', nameEn: 'Avocado', category: 'juices', price: 25 },
  { id: 'jus-avocat-fruit-sec', nameFr: 'Avocat Fruit Sec', nameAr: 'أفوكادو بالفواكه الجافة', nameEn: 'Avocado with Dry Fruit', category: 'juices', price: 30 },
  { id: 'jus-panache-orange-fruit-sec', nameFr: 'Panaché Orange Fruit Sec', nameAr: 'بناشي البرتقال بالفواكه الجافة', nameEn: 'Orange Mix with Dry Fruit', category: 'juices', price: 30 },

  // ---------------- NOS BOISSONS ----------------
  { id: 'the-marocain', nameFr: 'Thé Marocain', nameAr: 'أتاي مغربي', nameEn: 'Moroccan Tea', category: 'drinks', price: 13 },
  { id: 'the-chamali', nameFr: 'Thé Chamali', nameAr: 'أتاي شمالي', nameEn: 'Chamali Tea', category: 'drinks', price: 7 },
  { id: 'cafe-creme', nameFr: 'Café Crème', nameAr: 'قهوة بالحليب', nameEn: 'Café Crème', category: 'drinks', price: 13 },
  { id: 'chocolat-chaud', nameFr: 'Chocolat Chaud', nameAr: 'شوكولاطة ساخنة', nameEn: 'Hot Chocolate', category: 'drinks', price: 13 },
  { id: 'the-lipton', nameFr: 'Thé Lipton', nameAr: 'أتاي ليبتون', nameEn: 'Lipton Tea', category: 'drinks', price: 12 },
  { id: 'verveine', nameFr: 'Verveine', nameAr: 'لويزة', nameEn: 'Verbena Tea', category: 'drinks', price: 12 },

  // ---------------- SUPPLÉMENTS ----------------
  { id: 'sup-jben', nameFr: 'Jben', nameAr: 'جبن', nameEn: 'Fresh Cheese', category: 'supplements', price: 6 },
  { id: 'sup-beurre', nameFr: 'Beurre', nameAr: 'زبدة', nameEn: 'Butter', category: 'supplements', price: 6 },
  { id: 'sup-amlou', nameFr: 'Amlou', nameAr: 'أملو', nameEn: 'Amlou', category: 'supplements', price: 5 },
  { id: 'sup-miel', nameFr: 'Miel', nameAr: 'عسل', nameEn: 'Honey', category: 'supplements', price: 4 },
  { id: 'sup-huile-olive', nameFr: "Huile d'Olive", nameAr: 'زيت الزيتون', nameEn: 'Olive Oil', category: 'supplements', price: 5 },
  { id: 'sup-olive-noire', nameFr: 'Olive Noire', nameAr: 'زيتون أسود', nameEn: 'Black Olives', category: 'supplements', price: 5 },
  { id: 'sup-fromage', nameFr: 'Fromage', nameAr: 'جبنة', nameEn: 'Cheese', category: 'supplements', price: 3 },
  { id: 'sup-luncheon', nameFr: 'Luncheon', nameAr: 'لونشون', nameEn: 'Luncheon Meat', category: 'supplements', price: 6 },
  { id: 'sup-fromage-rouge', nameFr: 'Fromage Rouge', nameAr: 'جبن أحمر', nameEn: 'Red Cheese', category: 'supplements', price: 8 },
  { id: 'sup-fromage-kiri', nameFr: 'Fromage Kiri', nameAr: 'جبنة كيري', nameEn: 'Kiri Cheese', category: 'supplements', price: 3 },
  { id: 'sup-charcuterie', nameFr: 'Charcuterie', nameAr: 'شاركوتري', nameEn: 'Cold Cuts', category: 'supplements', price: 8 },
  { id: 'sup-nutella', nameFr: 'Nutella', nameAr: 'نوتيلا', nameEn: 'Nutella', category: 'supplements', price: 10 },
];
