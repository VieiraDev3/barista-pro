
export interface BrewStep {
  time: number; // seconds from start
  instruction: string;
  waterTarget?: number; // cumulative water in grams at this step
  phase: 'bloom' | 'pour' | 'wait' | 'press' | 'done';
}

export type GrindSizeType = 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';

export interface GrindSize {
  value: GrindSizeType;
  label: string;
  description: string;
}

export interface BrewingMethod {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  defaultRatio: number; // coffee:water (e.g. 15 means 1:15)
  defaultVolume: number; // ml
  grindSize: GrindSizeType;
  grindDescription: string; // visual analogy
  waterTemp: number; // °C
  totalTime: number; // seconds
  steps: BrewStep[];
  tips: string[];
  category: 'pour-over' | 'immersion' | 'pressure' | 'cold';
  // New fields for historical content
  history: string;
  origin: string;
  inventor: string;
  toolsImage?: string; // URL to tool image
}



export const GRIND_SIZES: GrindSize[] = [
  { value: 'extra-fine', label: 'Extra Fina', description: 'Similar a pó de talco. Usado para espresso e métodos de alta pressão.' },
  { value: 'fine', label: 'Fina', description: 'Similar a areia fina. Ideal para AeroPress e Moka.' },
  { value: 'medium-fine', label: 'Média-Fina', description: 'Similar a sal de mesa. Perfeita para V60 e Chemex.' },
  { value: 'medium', label: 'Média', description: 'Similar a areia comum. Ideal para Melitta e pour-overs.' },
  { value: 'medium-coarse', label: 'Média-Grossa', description: 'Ligeiramente mais grossa que areia. Para alguns métodos de imersão.' },
  { value: 'coarse', label: 'Grossa', description: 'Similar a grãos de açúcar. Ideal para French Press e Cold Brew.' },
];

export const BREWING_METHODS: BrewingMethod[] = [
  {
    id: 'v60',
    name: 'V60',
    emoji: '☕',
    description: 'Um método de coagem de precisão com um dripper cônico que produz uma xícara limpa, brilhante e nuançada. Amado por entusiastas de café especial.',
    difficulty: 'intermediate',
    defaultRatio: 15,
    defaultVolume: 300,
    grindSize: 'medium-fine',
    grindDescription: 'Similar ao sal de mesa — ligeiramente mais fina que areia comum',
    waterTemp: 93,
    totalTime: 210,
    category: 'pour-over',
    history: 'O V60 foi inventado em 2005 pela Hario, uma empresa japonesa especializada em vidro. O nome "V60" vem do formato em V do dripper com um ângulo de 60 graus. Tornou-se extremamente popular entre baristas profissionais e entusiastas de café de terceira onda por sua capacidade de extrair sabores complexos e nuançados.',
    origin: 'Japão',
    inventor: 'Hario (2005)',
    steps: [
      { time: 0, instruction: 'Despeje 60g em movimentos circulares lentos para fazer bloom do café', waterTarget: 60, phase: 'bloom' },
      { time: 45, instruction: 'Despeje lentamente até 150g em movimentos circulares', waterTarget: 150, phase: 'pour' },
      { time: 75, instruction: 'Continue despejando até 250g', waterTarget: 250, phase: 'pour' },
      { time: 105, instruction: 'Termine com a água restante até 300g', waterTarget: 300, phase: 'pour' },
      { time: 210, instruction: 'Preparo completo! Aproveite seu V60.', phase: 'done' },
    ],
    tips: [
      'Pré-umedeça o filtro para remover o gosto de papel e aquecer o recipiente',
      'Mantenha um fluxo de água constante e lento para extração uniforme',
      'O bloom libera CO2 — aguarde o borbulhamento diminuir',
      'A água deve estar entre 90-95°C para melhor extração',
      'Moagem média-fina é crucial para evitar sub-extração',
    ],
  },
  {
    id: 'melitta',
    name: 'Melitta',
    emoji: '🫗',
    description: 'Uma coagem clássica alemã com filtro de fundo plano. Perdoadora e consistente, ótima para o preparo diário.',
    difficulty: 'beginner',
    defaultRatio: 15,
    defaultVolume: 300,
    grindSize: 'medium',
    grindDescription: 'Similar a areia grossa ou açúcar cristal',
    waterTemp: 92,
    totalTime: 240,
    category: 'pour-over',
    history: 'Melitta foi criada em 1908 por Melitta Bentz, uma dona de casa alemã que estava frustrada com a forma como o café era preparado na época. Ela inventou o método usando papel de filtro e um dripper simples, revolucionando a forma como as pessoas fazem café em casa. Seu método tornou-se tão popular que a marca Melitta ainda existe e é usada por milhões de pessoas em todo o mundo.',
    origin: 'Alemanha',
    inventor: 'Melitta Bentz (1908)',
    steps: [
      { time: 0, instruction: 'Despeje 60g uniformemente sobre o pó para fazer bloom', waterTarget: 60, phase: 'bloom' },
      { time: 45, instruction: 'Despeje até 180g em um fluxo lento e constante', waterTarget: 180, phase: 'pour' },
      { time: 120, instruction: 'Termine despejando até 300g', waterTarget: 300, phase: 'pour' },
      { time: 240, instruction: 'Preparo completo! Seu Melitta está pronto.', phase: 'done' },
    ],
    tips: [
      'O fundo plano cria um tempo de contato mais longo para corpo mais cheio',
      'Despeje no centro para evitar canalização',
      'Ideal para iniciantes — muito mais tolerante com erros de técnica',
      'Filtros de papel Melitta originais são recomendados para melhor sabor',
    ],
  },
  {
    id: 'chemex',
    name: 'Chemex',
    emoji: '🧪',
    description: 'Uma elegante coagem em vidro usando filtros colados espessos que produzem uma xícara excepcionalmente limpa, sem sedimento e com clareza brilhante.',
    difficulty: 'intermediate',
    defaultRatio: 16,
    defaultVolume: 400,
    grindSize: 'medium',
    grindDescription: 'Similar a areia grossa — ligeiramente mais grossa que V60',
    waterTemp: 94,
    totalTime: 270,
    category: 'pour-over',
    history: 'A Chemex foi inventada em 1941 por Peter Schlumbohm, um químico alemão. Seu design icônico em forma de ampulheta tornou-se tão reconhecível que a Chemex está em exibição permanente no Museu de Arte Moderna de Nova York. Os filtros espessos da Chemex removem óleos de café, resultando em uma xícara particularmente limpa e clara. É considerada uma obra de arte tanto funcional quanto visual.',
    origin: 'Estados Unidos',
    inventor: 'Peter Schlumbohm (1941)',
    steps: [
      { time: 0, instruction: 'Despeje 80g para fazer bloom — o filtro espesso precisa de mais água', waterTarget: 80, phase: 'bloom' },
      { time: 45, instruction: 'Despeje até 200g em círculos lentos', waterTarget: 200, phase: 'pour' },
      { time: 120, instruction: 'Despeje até 320g', waterTarget: 320, phase: 'pour' },
      { time: 180, instruction: 'Termine com a água restante até 400g', waterTarget: 400, phase: 'pour' },
      { time: 270, instruction: 'Preparo completo! Sua Chemex está pronta.', phase: 'done' },
    ],
    tips: [
      'O filtro espesso da Chemex remove óleos para uma xícara muito limpa',
      'Pré-umedeça o filtro completamente — é muito mais espesso que filtros padrão',
      'Use a proporção 1:16 para realçar os sabores delicados',
      'A Chemex é exibida no Museu de Arte Moderna de Nova York',
      'Ideal para café de origem única e grãos de alta qualidade',
    ],
  },
  {
    id: 'french-press',
    name: 'French Press',
    emoji: '🫖',
    description: 'Um método de imersão clássico que mantém os óleos naturais do café, produzindo uma xícara rica, corpulenta e encorpada.',
    difficulty: 'beginner',
    defaultRatio: 12,
    defaultVolume: 350,
    grindSize: 'coarse',
    grindDescription: 'Grossa como grãos de açúcar — evita sedimento excessivo',
    waterTemp: 95,
    totalTime: 540,
    category: 'immersion',
    history: 'Embora frequentemente associada à França, a French Press foi na verdade patenteada pela primeira vez por um italiano, Attilio Calimani, em 1901. A versão moderna foi refinada pelos franceses e popularizada globalmente. O método é amado por sua simplicidade e capacidade de extrair óleos naturais, criando um café com corpo completo. É um dos métodos mais populares em cafeterias e lares em todo o mundo.',
    origin: 'Itália/França',
    inventor: 'Attilio Calimani (1901), refinado na França',
    steps: [
      { time: 0, instruction: 'Despeje toda a água (350g) sobre o pó e mexa suavemente', waterTarget: 350, phase: 'pour' },
      { time: 240, instruction: 'Quebre a crosta — mexa a camada superior e remova a espuma', phase: 'wait' },
      { time: 300, instruction: 'Coloque o êmbolo no topo. Aguarde antes de pressionar.', phase: 'wait' },
      { time: 300, instruction: 'Pressione o êmbolo lentamente e uniformemente. Sirva imediatamente.', phase: 'press' },
      { time: 540, instruction: 'French Press completo! Sirva imediatamente para parar a extração.', phase: 'done' },
    ],
    tips: [
      'Use moagem grossa para evitar sobre-extração e sedimento',
      'Quebrar a crosta melhora a clareza e o sabor',
      'Sirva imediatamente após pressionar para evitar sobre-extração',
      'Ideal para café com corpo completo e sabor robusto',
      'Limpe bem a French Press após cada uso para evitar acúmulo de óleos',
    ],
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    emoji: '🔫',
    description: 'Um método de pressão portátil que combina imersão e pressão para extrair café rapidamente com sabor limpo e concentrado.',
    difficulty: 'intermediate',
    defaultRatio: 14,
    defaultVolume: 200,
    grindSize: 'medium-fine',
    grindDescription: 'Similar ao sal de mesa — ligeiramente mais fina que areia comum',
    waterTemp: 90,
    totalTime: 120,
    category: 'pressure',
    history: 'O AeroPress foi inventado em 2005 por Alan Adler, um engenheiro e inventor americano. Apesar de ser relativamente novo, tornou-se extremamente popular entre viajantes e entusiastas de café por sua portabilidade, durabilidade e capacidade de fazer café delicioso em qualquer lugar. Ganhou o Prêmio de Inovação em 2008 e é usado por baristas profissionais em competições internacionais.',
    origin: 'Estados Unidos',
    inventor: 'Alan Adler (2005)',
    steps: [
      { time: 0, instruction: 'Coloque um filtro no porta-filtro e pré-umedeça com água quente', waterTarget: 0, phase: 'bloom' },
      { time: 10, instruction: 'Despeje o café moído no cilindro', waterTarget: 0, phase: 'pour' },
      { time: 10, instruction: 'Despeje água até a marca 1 e mexa por 10 segundos', waterTarget: 200, phase: 'bloom' },
      { time: 30, instruction: 'Coloque o êmbolo no topo e pressione lentamente por 30 segundos', waterTarget: 200, phase: 'press' },
      { time: 120, instruction: 'Preparo completo! Seu AeroPress está pronto.', phase: 'done' },
    ],
    tips: [
      'O AeroPress é extremamente portátil — perfeito para viagens',
      'Pressione lentamente para melhor extração',
      'Experimente diferentes tempos de imersão para ajustar o sabor',
      'Ideal para café concentrado ou americano',
      'Fácil de limpar — basta ejetar o disco de café',
    ],
  },
  {
    id: 'moka',
    name: 'Moka',
    emoji: '⚙️',
    description: 'Um método de pressão de fogão que produz café forte e concentrado, popular na Itália e América Latina.',
    difficulty: 'beginner',
    defaultRatio: 7,
    defaultVolume: 150,
    grindSize: 'fine',
    grindDescription: 'Fina como açúcar em pó — similar ao espresso',
    waterTemp: 90,
    totalTime: 300,
    category: 'pressure',
    history: 'A Moka foi inventada em 1933 por Alfonso Bialetti, um engenheiro italiano. Seu design icônico com alças de bakelite tornou-se um símbolo da cultura italiana. A Moka é conhecida como "cafeteira de espresso" porque produz café muito forte, embora tecnicamente não seja espresso verdadeiro. É uma das cafeteiras mais vendidas no mundo e permanece praticamente inalterada desde sua invenção.',
    origin: 'Itália',
    inventor: 'Alfonso Bialetti (1933)',
    steps: [
      { time: 0, instruction: 'Encha a câmara inferior com água até a válvula de segurança', waterTarget: 0, phase: 'pour' },
      { time: 30, instruction: 'Encha o filtro com café moído fino, sem pressionar', waterTarget: 0, phase: 'pour' },
      { time: 30, instruction: 'Rosqueie a câmara superior na inferior', waterTarget: 0, phase: 'wait' },
      { time: 60, instruction: 'Coloque em fogo médio. Você ouvirá um chiado quando estiver pronto.', waterTarget: 0, phase: 'wait' },
      { time: 300, instruction: 'Retire do fogo e coloque a câmara inferior em água fria para parar a extração.', phase: 'done' },
    ],
    tips: [
      'Use moagem fina — similar à do espresso',
      'Não pressione o café no filtro — deixe solto',
      'Retire do fogo assim que ouvir o chiado para evitar queimar',
      'Use água morna na câmara inferior para acelerar o processo',
      'Limpe a válvula de segurança regularmente',
    ],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    emoji: '🧊',
    description: 'Uma infusão fria de longa duração que produz café suave, doce e com baixa acidez — perfeito para bebidas geladas.',
    difficulty: 'beginner',
    defaultRatio: 8,
    defaultVolume: 500,
    grindSize: 'coarse',
    grindDescription: 'Grossa como grãos de açúcar — evita sedimento excessivo',
    waterTemp: 20,
    totalTime: 86400,
    category: 'cold',
    history: 'O Cold Brew tem raízes em métodos de preparo de café frio usados há séculos em várias culturas, particularmente na Ásia e Oriente Médio. No entanto, ganhou popularidade moderna na década de 2010 com o crescimento das cafeterias de terceira onda. O método é apreciado por sua suavidade, doçura natural e baixa acidez, tornando-o ideal para pessoas com estômagos sensíveis.',
    origin: 'Múltiplas origens (popularizado modernamente nos EUA)',
    inventor: 'Método tradicional, popularizado por cafeterias especializadas',
    steps: [
      { time: 0, instruction: 'Coloque café moído grosso em um frasco (proporção 1:8)', waterTarget: 0, phase: 'pour' },
      { time: 10, instruction: 'Despeje água fria e mexa bem para saturar todo o café', waterTarget: 500, phase: 'pour' },
      { time: 600, instruction: 'Cubra e deixe em repouso em temperatura ambiente ou na geladeira', phase: 'wait' },
      { time: 86400, instruction: 'Após 12-24 horas, coe através de um filtro fino', phase: 'wait' },
      { time: 86400, instruction: 'Cold Brew completo! Dilua com água ou leite e gelo.', phase: 'done' },
    ],
    tips: [
      'O Cold Brew tem até 67% menos acidez que o café quente',
      'Deixe em repouso por 12-24 horas para melhor sabor',
      'Armazene na geladeira por até 2 semanas',
      'Ideal para bebidas geladas e concentrado para receitas',
      'Experimente diferentes proporções para ajustar a força',
    ],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    emoji: '☕',
    description: 'Café altamente concentrado feito com pressão, produzindo um shot intenso com crema sedosa — base para cappuccinos e lattes.',
    difficulty: 'advanced',
    defaultRatio: 2,
    defaultVolume: 30,
    grindSize: 'fine',
    grindDescription: 'Muito fina — similar a farinha fina',
    waterTemp: 90,
    totalTime: 30,
    category: 'pressure',
    history: 'O Espresso foi inventado no final do século 19 na Itália, com a primeira máquina de espresso patenteada por Desiderio Pavoni em 1901. O nome "espresso" vem da palavra italiana que significa "pressionado" ou "expressado". O espresso revolucionou a forma como as pessoas bebem café, tornando-se a base de bebidas como cappuccino, latte e americano. Hoje, o espresso é considerado uma forma de arte, com baristas profissionais competindo em campeonatos mundiais.',
    origin: 'Itália',
    inventor: 'Desiderio Pavoni (1901)',
    steps: [
      { time: 0, instruction: 'Moa o café muito fino e coloque no porta-filtro', waterTarget: 0, phase: 'pour' },
      { time: 5, instruction: 'Distribua o café uniformemente e pressione (tampe) com força firme', waterTarget: 0, phase: 'pour' },
      { time: 5, instruction: 'Coloque o porta-filtro na máquina e inicie a extração', waterTarget: 0, phase: 'bloom' },
      { time: 30, instruction: 'Extraia por 25-30 segundos até obter 30ml de espresso com crema dourada', waterTarget: 30, phase: 'pour' },
      { time: 30, instruction: 'Espresso completo! Use como base para outras bebidas ou beba puro.', phase: 'done' },
    ],
    tips: [
      'A moagem deve ser muito fina — ajuste conforme necessário',
      'Tampe com pressão firme e uniforme para extração consistente',
      'A temperatura da água é crítica — 88-92°C é ideal',
      'Procure por crema dourada no topo do espresso',
      'Limpe o porta-filtro entre cada shot para evitar acúmulo de óleos',
      'Espresso é uma arte — pratique e experimente diferentes técnicas',
    ],
  },
];

export function getMethodById(id: string): BrewingMethod | undefined {
  return BREWING_METHODS.find(m => m.id === id);
}


