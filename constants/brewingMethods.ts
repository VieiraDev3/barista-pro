export type GrindSize = 'extra-fine' | 'fine' | 'medium-fine' | 'medium' | 'medium-coarse' | 'coarse';

export interface BrewStep {
  time: number; // seconds from start
  instruction: string;
  waterTarget?: number; // cumulative water in grams at this step
  phase: 'bloom' | 'pour' | 'wait' | 'press' | 'done';
}

export interface BrewingMethod {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  defaultRatio: number; // coffee:water (e.g. 15 means 1:15)
  defaultVolume: number; // ml
  grindSize: GrindSize;
  grindDescription: string; // visual analogy
  waterTemp: number; // °C
  totalTime: number; // seconds
  steps: BrewStep[];
  tips: string[];
  category: 'pour-over' | 'immersion' | 'pressure' | 'cold';
}

export const BREWING_METHODS: BrewingMethod[] = [
  {
    id: 'v60',
    name: 'V60',
    emoji: '☕',
    description: 'A precision pour-over method with a conical dripper that produces a clean, bright, and nuanced cup. Beloved by specialty coffee enthusiasts.',
    difficulty: 'intermediate',
    defaultRatio: 15,
    defaultVolume: 300,
    grindSize: 'medium-fine',
    grindDescription: 'Similar to table salt — slightly finer than regular sand',
    waterTemp: 93,
    totalTime: 210,
    category: 'pour-over',
    steps: [
      { time: 0, instruction: 'Pour 60g in slow circular motions to bloom the coffee', waterTarget: 60, phase: 'bloom' },
      { time: 45, instruction: 'Pour slowly up to 150g in circular motions', waterTarget: 150, phase: 'pour' },
      { time: 75, instruction: 'Continue pouring up to 250g', waterTarget: 250, phase: 'pour' },
      { time: 105, instruction: 'Finish with the remaining water up to 300g', waterTarget: 300, phase: 'pour' },
      { time: 210, instruction: 'Brewing complete! Enjoy your V60.', phase: 'done' },
    ],
    tips: [
      'Pre-wet the filter to remove paper taste and warm the vessel',
      'Keep a steady, slow pour for even extraction',
      'The bloom releases CO2 — wait for bubbling to subside',
    ],
  },
  {
    id: 'melitta',
    name: 'Melitta',
    emoji: '🫗',
    description: 'A classic German pour-over with a flat-bottom filter. Forgiving and consistent, great for everyday brewing.',
    difficulty: 'beginner',
    defaultRatio: 15,
    defaultVolume: 300,
    grindSize: 'medium',
    grindDescription: 'Similar to coarse sand or raw sugar',
    waterTemp: 92,
    totalTime: 240,
    category: 'pour-over',
    steps: [
      { time: 0, instruction: 'Pour 60g evenly over the grounds to bloom', waterTarget: 60, phase: 'bloom' },
      { time: 45, instruction: 'Pour up to 180g in a slow, steady stream', waterTarget: 180, phase: 'pour' },
      { time: 120, instruction: 'Finish pouring up to 300g', waterTarget: 300, phase: 'pour' },
      { time: 240, instruction: 'Brewing complete! Your Melitta is ready.', phase: 'done' },
    ],
    tips: [
      'The flat bottom creates a longer contact time for fuller body',
      'Pour in the center to avoid channeling',
    ],
  },
  {
    id: 'chemex',
    name: 'Chemex',
    emoji: '🧪',
    description: 'An elegant glass pour-over using thick bonded filters that produce an exceptionally clean, sediment-free cup with bright clarity.',
    difficulty: 'intermediate',
    defaultRatio: 16,
    defaultVolume: 400,
    grindSize: 'medium',
    grindDescription: 'Similar to coarse sand — slightly coarser than V60',
    waterTemp: 94,
    totalTime: 270,
    category: 'pour-over',
    steps: [
      { time: 0, instruction: 'Pour 80g to bloom — the thick filter needs more water', waterTarget: 80, phase: 'bloom' },
      { time: 45, instruction: 'Pour up to 200g in slow circles', waterTarget: 200, phase: 'pour' },
      { time: 120, instruction: 'Pour up to 320g', waterTarget: 320, phase: 'pour' },
      { time: 180, instruction: 'Finish with remaining water up to 400g', waterTarget: 400, phase: 'pour' },
      { time: 270, instruction: 'Brewing complete! Your Chemex is ready.', phase: 'done' },
    ],
    tips: [
      'The thick Chemex filter removes oils for a very clean cup',
      'Pre-wet the filter thoroughly — it is much thicker than standard filters',
      'Pour in a slow spiral from center outward',
    ],
  },
  {
    id: 'french-press',
    name: 'French Press',
    emoji: '🫖',
    description: 'A full-immersion method that produces a rich, bold, and full-bodied cup with natural oils and texture.',
    difficulty: 'beginner',
    defaultRatio: 15,
    defaultVolume: 350,
    grindSize: 'coarse',
    grindDescription: 'Similar to coarse sea salt or breadcrumbs',
    waterTemp: 95,
    totalTime: 540,
    category: 'immersion',
    steps: [
      { time: 0, instruction: 'Pour all water (350g) over the grounds and stir gently', waterTarget: 350, phase: 'pour' },
      { time: 240, instruction: 'Break the crust — stir the top layer and skim the foam', phase: 'wait' },
      { time: 300, instruction: 'Place the plunger on top. Wait before pressing.', phase: 'wait' },
      { time: 300, instruction: 'Press the plunger slowly and steadily. Serve immediately.', phase: 'press' },
      { time: 540, instruction: 'French Press complete! Serve immediately to stop extraction.', phase: 'done' },
    ],
    tips: [
      'Use coarse grind to prevent over-extraction and sediment',
      'Breaking the crust improves clarity and flavor',
      'Serve immediately after pressing to stop extraction',
    ],
  },
  {
    id: 'aeropress',
    name: 'AeroPress',
    emoji: '🔧',
    description: 'A versatile, portable brewer that uses air pressure for fast extraction. Produces concentrated, espresso-like coffee or a full cup.',
    difficulty: 'intermediate',
    defaultRatio: 12,
    defaultVolume: 200,
    grindSize: 'medium-fine',
    grindDescription: 'Slightly finer than table salt',
    waterTemp: 85,
    totalTime: 150,
    category: 'pressure',
    steps: [
      { time: 0, instruction: 'Add coffee, pour 40g water to bloom', waterTarget: 40, phase: 'bloom' },
      { time: 30, instruction: 'Pour remaining water up to 200g and stir', waterTarget: 200, phase: 'pour' },
      { time: 90, instruction: 'Attach filter cap, flip onto cup, and begin pressing', phase: 'press' },
      { time: 150, instruction: 'Press complete! Dilute with hot water if desired.', phase: 'done' },
    ],
    tips: [
      'Lower water temperature (80-90°C) reduces bitterness',
      'Experiment with inverted method for longer steep time',
      'Press slowly and steadily — about 30 seconds',
    ],
  },
  {
    id: 'moka',
    name: 'Moka Pot',
    emoji: '🫙',
    description: 'An Italian stovetop brewer that uses steam pressure to produce a strong, concentrated coffee similar to espresso.',
    difficulty: 'beginner',
    defaultRatio: 7,
    defaultVolume: 120,
    grindSize: 'fine',
    grindDescription: 'Fine like powdered sugar — but not as fine as espresso',
    waterTemp: 90,
    totalTime: 300,
    category: 'pressure',
    steps: [
      { time: 0, instruction: 'Fill the bottom chamber with hot water up to the valve', waterTarget: 120, phase: 'pour' },
      { time: 60, instruction: 'Place on medium-low heat. Listen for the gurgling sound.', phase: 'wait' },
      { time: 240, instruction: 'When coffee starts flowing, reduce heat slightly', phase: 'wait' },
      { time: 300, instruction: 'Remove from heat when you hear a hissing sound. Serve!', phase: 'done' },
    ],
    tips: [
      'Use pre-boiled water to avoid over-heating the coffee',
      'Do not tamp the grounds — just level them',
      'Remove from heat before all water is used to avoid burnt taste',
    ],
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    emoji: '🧊',
    description: 'A slow cold-water extraction over 12-24 hours producing a smooth, low-acid concentrate that can be diluted to taste.',
    difficulty: 'beginner',
    defaultRatio: 8,
    defaultVolume: 500,
    grindSize: 'coarse',
    grindDescription: 'Very coarse, like rough breadcrumbs or peppercorns',
    waterTemp: 20,
    totalTime: 43200, // 12 hours
    category: 'cold',
    steps: [
      { time: 0, instruction: 'Combine coarse grounds with cold water (500g). Stir to saturate.', waterTarget: 500, phase: 'pour' },
      { time: 3600, instruction: 'Refrigerate. Extraction is happening slowly.', phase: 'wait' },
      { time: 43200, instruction: 'Strain through filter. Dilute 1:1 with water or milk. Enjoy cold!', phase: 'done' },
    ],
    tips: [
      'Cold brew concentrate keeps for up to 2 weeks refrigerated',
      'Coarser grind prevents over-extraction during the long steep',
      'Dilute 1:1 for regular strength or enjoy straight as concentrate',
    ],
  },
  {
    id: 'espresso',
    name: 'Espresso',
    emoji: '⚡',
    description: 'A concentrated shot brewed under 9 bars of pressure in 25-30 seconds. The foundation of most coffee drinks.',
    difficulty: 'advanced',
    defaultRatio: 2,
    defaultVolume: 60,
    grindSize: 'extra-fine',
    grindDescription: 'Very fine like powdered sugar or fine flour',
    waterTemp: 93,
    totalTime: 30,
    category: 'pressure',
    steps: [
      { time: 0, instruction: 'Dose 18g, distribute evenly, tamp with 15-20kg pressure', phase: 'pour' },
      { time: 5, instruction: 'Lock portafilter, start extraction. Pre-infusion begins.', phase: 'bloom' },
      { time: 10, instruction: 'Full pressure extraction. Watch for golden honey-like flow.', phase: 'pour' },
      { time: 30, instruction: 'Stop at target yield (36g). Evaluate crema color and texture.', phase: 'done' },
    ],
    tips: [
      'Dial in grind size to achieve 25-30 second extraction',
      'Even distribution and level tamp prevent channeling',
      'Target 1:2 ratio (18g in → 36g out) for balanced espresso',
    ],
  },
];

export const getMethodById = (id: string): BrewingMethod | undefined => {
  return BREWING_METHODS.find(m => m.id === id);
};

export const GRIND_SIZES: { value: GrindSize; label: string; description: string }[] = [
  { value: 'extra-fine', label: 'Extra Fine', description: 'Like powdered sugar' },
  { value: 'fine', label: 'Fine', description: 'Like table salt' },
  { value: 'medium-fine', label: 'Medium Fine', description: 'Like fine sand' },
  { value: 'medium', label: 'Medium', description: 'Like coarse sand' },
  { value: 'medium-coarse', label: 'Medium Coarse', description: 'Like rough sand' },
  { value: 'coarse', label: 'Coarse', description: 'Like sea salt or breadcrumbs' },
];
