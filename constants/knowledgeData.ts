export interface KnowledgeItem {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  content: string;
  details?: { label: string; value: string }[];
  flavorProfile?: string[];
  tips?: string[];
}

export interface KnowledgeCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
  color: string;
  items: KnowledgeItem[];
}

export const KNOWLEDGE_DATA: KnowledgeCategory[] = [
  {
    id: 'beans',
    title: 'Grãos & Torras',
    emoji: '🫘',
    description: 'Conheça as variedades de grãos, métodos de processamento e níveis de torra.',
    color: '#8B4513',
    items: [
      {
        id: 'arabica',
        title: 'Arábica',
        subtitle: 'Coffea arabica',
        emoji: '🌿',
        content: 'O Arábica representa cerca de 60-70% da produção mundial de café. Cultivado em altitudes elevadas (600-2000m), possui sabor mais suave e complexo, com acidez pronunciada e notas frutadas e florais. É mais sensível a pragas e doenças, tornando-o mais caro.',
        details: [
          { label: 'Cafeína', value: '1.2-1.5%' },
          { label: 'Altitude', value: '600-2000m' },
          { label: 'Acidez', value: 'Alta' },
          { label: 'Corpo', value: 'Médio' },
        ],
        flavorProfile: ['Frutas', 'Floral', 'Caramelo', 'Nozes'],
        tips: ['Ideal para métodos de filtro e espresso de qualidade', 'Melhor consumido fresco, até 4 semanas após a torra'],
      },
      {
        id: 'robusta',
        title: 'Robusta',
        subtitle: 'Coffea canephora',
        emoji: '💪',
        content: 'O Robusta é mais resistente a pragas e cresce em altitudes menores. Possui quase o dobro de cafeína do Arábica, sabor mais encorpado e amargo, com notas terrosas e de borracha. Muito usado em blends de espresso para criar crema espessa.',
        details: [
          { label: 'Cafeína', value: '2.2-2.7%' },
          { label: 'Altitude', value: '0-800m' },
          { label: 'Acidez', value: 'Baixa' },
          { label: 'Corpo', value: 'Alto' },
        ],
        flavorProfile: ['Terroso', 'Amadeirado', 'Chocolate amargo', 'Defumado'],
        tips: ['Usado em blends para aumentar corpo e crema', 'Base de muitos cafés solúveis'],
      },
      {
        id: 'geisha',
        title: 'Geisha',
        subtitle: 'Variedade especial',
        emoji: '🌸',
        content: 'Originária da Etiópia e famosa pelo Panamá, a Geisha é considerada uma das variedades mais raras e caras do mundo. Possui perfil aromático extraordinariamente floral e frutado, com notas de jasmim, pêssego e bergamota. Cultivada em altitudes extremas.',
        details: [
          { label: 'Origem', value: 'Etiópia / Panamá' },
          { label: 'Altitude', value: '1500-2000m' },
          { label: 'Acidez', value: 'Alta' },
          { label: 'Raridade', value: 'Muito rara' },
        ],
        flavorProfile: ['Jasmim', 'Pêssego', 'Bergamota', 'Floral intenso'],
        tips: ['Melhor apreciada em métodos de filtro que preservam a delicadeza', 'Evite temperaturas muito altas que podem mascarar as notas florais'],
      },
      {
        id: 'natural',
        title: 'Processamento Natural',
        subtitle: 'Método de processamento',
        emoji: '☀️',
        content: 'No processamento natural, os frutos do café são secos inteiros ao sol por 3-6 semanas. A polpa em contato com o grão durante a secagem transfere açúcares e compostos fermentados, resultando em sabores mais frutados, adocicados e encorpados.',
        details: [
          { label: 'Tempo', value: '3-6 semanas' },
          { label: 'Corpo', value: 'Alto' },
          { label: 'Doçura', value: 'Alta' },
          { label: 'Complexidade', value: 'Alta' },
        ],
        flavorProfile: ['Frutas vermelhas', 'Vinho', 'Fermentado', 'Chocolate'],
        tips: ['Produz cafés com maior doçura natural', 'Requer clima seco e ensolarado para secagem uniforme'],
      },
      {
        id: 'washed',
        title: 'Processamento Lavado',
        subtitle: 'Método de processamento',
        emoji: '💧',
        content: 'No método lavado (ou úmido), a polpa é removida mecanicamente e o grão é fermentado em água por 12-48 horas para remover o mucilagem. Resulta em cafés mais limpos, com acidez brilhante e perfil mais transparente que reflete o terroir.',
        details: [
          { label: 'Fermentação', value: '12-48 horas' },
          { label: 'Acidez', value: 'Alta e brilhante' },
          { label: 'Corpo', value: 'Médio-baixo' },
          { label: 'Clareza', value: 'Alta' },
        ],
        flavorProfile: ['Cítrico', 'Floral', 'Chá', 'Limpo'],
        tips: ['Ideal para mostrar as características do terroir', 'Produz cafés mais consistentes e previsíveis'],
      },
      {
        id: 'honey',
        title: 'Processamento Honey',
        subtitle: 'Método de processamento',
        emoji: '🍯',
        content: 'O processo honey é um meio-termo entre natural e lavado. A polpa é removida mas parte do mucilagem (a "mel") permanece no grão durante a secagem. Existem variações: Yellow Honey (pouco mucilagem), Red Honey e Black Honey (mais mucilagem, mais doce).',
        details: [
          { label: 'Mucilagem', value: '25-100% retida' },
          { label: 'Corpo', value: 'Médio-alto' },
          { label: 'Doçura', value: 'Média-alta' },
          { label: 'Acidez', value: 'Média' },
        ],
        flavorProfile: ['Mel', 'Frutas tropicais', 'Caramelo', 'Corpo sedoso'],
        tips: ['Black Honey tem mais doçura e corpo que Yellow Honey', 'Excelente equilíbrio entre clareza e doçura'],
      },
      {
        id: 'light-roast',
        title: 'Torra Clara',
        subtitle: 'Nível de torra',
        emoji: '🌅',
        content: 'A torra clara (light roast) é processada a temperaturas entre 180-205°C, antes do primeiro crack. Preserva mais dos compostos originais do grão, resultando em maior acidez, notas frutadas e florais, e menor corpo. Tem mais cafeína por volume.',
        details: [
          { label: 'Temperatura', value: '180-205°C' },
          { label: 'Acidez', value: 'Alta' },
          { label: 'Corpo', value: 'Baixo' },
          { label: 'Cafeína', value: 'Mais alta' },
        ],
        flavorProfile: ['Frutas', 'Floral', 'Cítrico', 'Chá'],
        tips: ['Melhor em métodos de filtro que realçam a acidez', 'Use temperaturas de água um pouco mais altas (94-96°C)'],
      },
      {
        id: 'medium-roast',
        title: 'Torra Média',
        subtitle: 'Nível de torra',
        emoji: '🌄',
        content: 'A torra média (medium roast) ocorre entre 210-220°C, após o primeiro crack. É o ponto de equilíbrio entre acidez e corpo, com notas de caramelo, chocolate ao leite e nozes. É a torra mais versátil, adequada para a maioria dos métodos de preparo.',
        details: [
          { label: 'Temperatura', value: '210-220°C' },
          { label: 'Acidez', value: 'Média' },
          { label: 'Corpo', value: 'Médio' },
          { label: 'Equilíbrio', value: 'Alto' },
        ],
        flavorProfile: ['Caramelo', 'Chocolate ao leite', 'Nozes', 'Frutas secas'],
        tips: ['Versátil para todos os métodos de preparo', 'Temperatura ideal de água: 90-93°C'],
      },
      {
        id: 'dark-roast',
        title: 'Torra Escura',
        subtitle: 'Nível de torra',
        emoji: '🌑',
        content: 'A torra escura (dark roast) ocorre acima de 225°C, após o segundo crack. Os óleos do grão ficam visíveis na superfície. O sabor é dominado pelos compostos da torra — chocolate amargo, defumado e caramelizado. A acidez original do grão é praticamente eliminada.',
        details: [
          { label: 'Temperatura', value: '225°C+' },
          { label: 'Acidez', value: 'Baixa' },
          { label: 'Corpo', value: 'Alto' },
          { label: 'Amargor', value: 'Alto' },
        ],
        flavorProfile: ['Chocolate amargo', 'Defumado', 'Caramelizado', 'Torrado'],
        tips: ['Ideal para espresso e métodos de pressão', 'Use água um pouco mais fria (88-92°C) para reduzir amargor'],
      },
    ],
  },
  {
    id: 'techniques',
    title: 'Técnicas de Barista',
    emoji: '🎯',
    description: 'Aprenda as técnicas profissionais para extrair o melhor de cada preparo.',
    color: '#2E4057',
    items: [
      {
        id: 'tds',
        title: 'TDS e Extração',
        subtitle: 'Controle de qualidade',
        emoji: '📊',
        content: 'TDS (Total Dissolved Solids) mede a concentração de sólidos dissolvidos no café. O espectro ideal de extração é entre 18-22%. Abaixo disso, o café fica sub-extraído (azedo, fraco). Acima, fica super-extraído (amargo, adstringente). Use um refratômetro para medir.',
        details: [
          { label: 'TDS ideal', value: '1.15-1.45%' },
          { label: 'Extração ideal', value: '18-22%' },
          { label: 'Sub-extração', value: '< 18% (azedo)' },
          { label: 'Super-extração', value: '> 22% (amargo)' },
        ],
        tips: [
          'Moagem mais fina aumenta a extração',
          'Temperatura mais alta aumenta a extração',
          'Tempo de contato mais longo aumenta a extração',
        ],
      },
      {
        id: 'water',
        title: 'Qualidade da Água',
        subtitle: 'Minerais e temperatura',
        emoji: '💧',
        content: 'A água representa 98% do café. Água filtrada com TDS entre 75-150 ppm é ideal. Magnésio realça a doçura e acidez. Cálcio contribui para o corpo. Água muito pura (< 50 ppm) produz café sem caráter. Água muito dura (> 200 ppm) causa incrustações e sabor metálico.',
        details: [
          { label: 'TDS ideal', value: '75-150 ppm' },
          { label: 'pH ideal', value: '6.5-7.5' },
          { label: 'Dureza', value: '50-175 ppm CaCO₃' },
          { label: 'Temperatura', value: '90-96°C' },
        ],
        tips: [
          'Evite água destilada — ela extrai compostos indesejados',
          'Água mineral com baixo teor de sódio é uma boa opção',
          'Filtros de carvão ativado removem cloro sem remover minerais',
        ],
      },
      {
        id: 'tamping',
        title: 'Tamping para Espresso',
        subtitle: 'Compactação do pó',
        emoji: '🔨',
        content: 'O tamping é a compactação do pó de café no porta-filtro antes da extração do espresso. O objetivo é criar uma superfície uniforme e resistente para que a água passe de forma homogênea. Pressão recomendada: 15-20kg. Superfície nivelada é mais importante que a força.',
        details: [
          { label: 'Pressão', value: '15-20 kg' },
          { label: 'Ângulo', value: '90° (perpendicular)' },
          { label: 'Superfície', value: 'Nivelada e uniforme' },
          { label: 'Polimento', value: 'Opcional (giro final)' },
        ],
        tips: [
          'Distribua o pó uniformemente antes de tampar',
          'Verifique se o tamper tem o diâmetro correto para o porta-filtro',
          'Canais (channeling) ocorrem quando o tamping é irregular',
        ],
      },
    ],
  },
];
