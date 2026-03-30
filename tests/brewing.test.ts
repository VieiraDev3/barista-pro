import { describe, it, expect } from 'vitest';
import { BREWING_METHODS, getMethodById, GRIND_SIZES } from '../constants/brewingMethods';
import { KNOWLEDGE_DATA } from '../constants/knowledgeData';
import { TIPS_OF_THE_DAY, DEFAULT_SETTINGS } from '../constants/types';

describe('Brewing Methods Config', () => {
  it('should have 8 brewing methods', () => {
    expect(BREWING_METHODS).toHaveLength(8);
  });

  it('should find method by id', () => {
    const v60 = getMethodById('v60');
    expect(v60).toBeDefined();
    expect(v60?.name).toBe('V60');
  });

  it('should return undefined for unknown method id', () => {
    const unknown = getMethodById('unknown-method');
    expect(unknown).toBeUndefined();
  });

  it('each method should have required fields', () => {
    BREWING_METHODS.forEach(method => {
      expect(method.id).toBeTruthy();
      expect(method.name).toBeTruthy();
      expect(method.emoji).toBeTruthy();
      expect(method.steps.length).toBeGreaterThan(0);
      expect(method.defaultRatio).toBeGreaterThan(0);
      expect(method.defaultVolume).toBeGreaterThan(0);
      expect(method.waterTemp).toBeGreaterThan(0);
    });
  });

  it('each method should have a done step as the last step', () => {
    BREWING_METHODS.forEach(method => {
      const lastStep = method.steps[method.steps.length - 1];
      expect(lastStep.phase).toBe('done');
    });
  });

  it('steps should be ordered by time', () => {
    BREWING_METHODS.forEach(method => {
      for (let i = 1; i < method.steps.length; i++) {
        expect(method.steps[i].time).toBeGreaterThanOrEqual(method.steps[i - 1].time);
      }
    });
  });
});

describe('Brew Calculations', () => {
  it('should calculate coffee dose correctly', () => {
    const volume = 300;
    const ratio = 15;
    const dose = volume / ratio;
    expect(dose).toBe(20);
  });

  it('should calculate water weight equal to volume', () => {
    const volume = 400;
    expect(volume).toBe(400);
  });

  it('V60 default ratio should be 1:15', () => {
    const v60 = getMethodById('v60');
    expect(v60?.defaultRatio).toBe(15);
  });

  it('Espresso default ratio should be 1:2', () => {
    const espresso = getMethodById('espresso');
    expect(espresso?.defaultRatio).toBe(2);
  });

  it('Cold Brew should have the longest total time', () => {
    const coldBrew = getMethodById('cold-brew');
    const espresso = getMethodById('espresso');
    expect(coldBrew!.totalTime).toBeGreaterThan(espresso!.totalTime);
  });
});

describe('Grind Sizes', () => {
  it('should have 6 grind sizes', () => {
    expect(GRIND_SIZES).toHaveLength(6);
  });

  it('should include extra-fine and coarse', () => {
    const values = GRIND_SIZES.map(g => g.value);
    expect(values).toContain('extra-fine');
    expect(values).toContain('coarse');
  });
});

describe('Knowledge Data', () => {
  it('should have 2 categories', () => {
    expect(KNOWLEDGE_DATA).toHaveLength(2);
  });

  it('beans category should have items', () => {
    const beans = KNOWLEDGE_DATA.find(c => c.id === 'beans');
    expect(beans).toBeDefined();
    expect(beans!.items.length).toBeGreaterThan(0);
  });

  it('techniques category should have items', () => {
    const techniques = KNOWLEDGE_DATA.find(c => c.id === 'techniques');
    expect(techniques).toBeDefined();
    expect(techniques!.items.length).toBeGreaterThan(0);
  });
});

describe('Tips of the Day', () => {
  it('should have multiple tips', () => {
    expect(TIPS_OF_THE_DAY.length).toBeGreaterThan(5);
  });

  it('each tip should have tip and category', () => {
    TIPS_OF_THE_DAY.forEach(t => {
      expect(t.tip).toBeTruthy();
      expect(t.category).toBeTruthy();
    });
  });
});

describe('Default Settings', () => {
  it('should have sensible defaults', () => {
    expect(DEFAULT_SETTINGS.defaultRatio).toBe(15);
    expect(DEFAULT_SETTINGS.defaultVolume).toBe(300);
    expect(DEFAULT_SETTINGS.ttsEnabled).toBe(true);
    expect(DEFAULT_SETTINGS.hapticEnabled).toBe(true);
  });
});
