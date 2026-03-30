export interface SensorialNotes {
  body: number; // 0-10
  acidity: number; // 0-10
  sweetness: number; // 0-10
  bitterness: number; // 0-10
}

export interface BrewHistoryEntry {
  id: string;
  method: string;
  methodName: string;
  dose: number; // grams
  water: number; // grams
  ratio: number; // e.g. 15 for 1:15
  volume: number; // ml
  brewTime: number; // seconds
  waterTemp: number; // °C
  grindSize: string;
  sensorialNotes: SensorialNotes;
  flavorNotes: string[];
  rating: number; // 1-5 stars
  recipeName: string;
  notes: string;
  timestamp: string; // ISO date string
}

export interface AppSettings {
  defaultRatio: number;
  defaultVolume: number;
  ttsEnabled: boolean;
  hapticEnabled: boolean;
  colorScheme: 'dark' | 'light' | 'system';
  units: 'metric' | 'imperial';
}

export const DEFAULT_SETTINGS: AppSettings = {
  defaultRatio: 15,
  defaultVolume: 300,
  ttsEnabled: true,
  hapticEnabled: true,
  colorScheme: 'dark',
  units: 'metric',
};

export const FLAVOR_NOTES = [
  'Frutas Amarelas', 'Frutas Vermelhas', 'Frutas Cítricas', 'Frutas Tropicais',
  'Chocolate', 'Cacau', 'Caramelo', 'Mel',
  'Nozes', 'Amêndoas', 'Avelã',
  'Floral', 'Jasmim', 'Rosa',
  'Especiarias', 'Canela', 'Baunilha',
  'Terroso', 'Amadeirado', 'Defumado',
  'Herbáceo', 'Gramíneo',
];

export const TIPS_OF_THE_DAY = [
  { tip: 'A temperatura ideal da água para a maioria dos métodos de preparo fica entre 90°C e 96°C.', category: 'Temperatura' },
  { tip: 'Café recém-torrado libera CO₂ por até 2 semanas. Esse gás pode afetar a extração — aguarde 3-7 dias após a torra.', category: 'Frescor' },
  { tip: 'A proporção 1:15 (1g de café para 15g de água) é um excelente ponto de partida para a maioria dos métodos.', category: 'Proporção' },
  { tip: 'Moa o café imediatamente antes do preparo para preservar os aromas voláteis.', category: 'Moagem' },
  { tip: 'O bloom (pré-infusão) libera CO₂ do café e melhora a extração uniforme.', category: 'Técnica' },
  { tip: 'Água filtrada com TDS entre 75-150 ppm é ideal para extrair os melhores sabores do café.', category: 'Água' },
  { tip: 'Cafés de torra clara tendem a ter maior acidez e notas frutadas. Torras escuras têm mais corpo e amargor.', category: 'Torra' },
  { tip: 'O Arábica representa cerca de 60% da produção mundial de café e é valorizado por sua complexidade aromática.', category: 'Grãos' },
  { tip: 'Para espresso perfeito, o tempo de extração deve ser entre 25-30 segundos para um shot de 30ml.', category: 'Espresso' },
  { tip: 'O Cold Brew tem até 67% menos acidez que o café quente, tornando-o mais suave para estômagos sensíveis.', category: 'Cold Brew' },
];
