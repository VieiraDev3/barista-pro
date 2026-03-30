import AsyncStorage from '@react-native-async-storage/async-storage';
import { BrewHistoryEntry, AppSettings, DEFAULT_SETTINGS } from '@/constants/types';

const KEYS = {
  BREW_HISTORY: 'barista_pro_brew_history',
  FAVORITES: 'barista_pro_favorites',
  SETTINGS: 'barista_pro_settings',
  LAST_METHOD: 'barista_pro_last_method',
};

// Brew History
export async function getBrewHistory(): Promise<BrewHistoryEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.BREW_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveBrewEntry(entry: BrewHistoryEntry): Promise<void> {
  const history = await getBrewHistory();
  const updated = [entry, ...history].slice(0, 100); // keep last 100
  await AsyncStorage.setItem(KEYS.BREW_HISTORY, JSON.stringify(updated));
}

export async function deleteBrewEntry(id: string): Promise<void> {
  const history = await getBrewHistory();
  const updated = history.filter(e => e.id !== id);
  await AsyncStorage.setItem(KEYS.BREW_HISTORY, JSON.stringify(updated));
}

// Favorites
export async function getFavorites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function toggleFavorite(methodId: string): Promise<boolean> {
  const favorites = await getFavorites();
  const isFav = favorites.includes(methodId);
  const updated = isFav
    ? favorites.filter(id => id !== methodId)
    : [...favorites, methodId];
  await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(updated));
  return !isFav;
}

// Settings
export async function getSettings(): Promise<AppSettings> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.SETTINGS);
    return raw ? { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(settings: Partial<AppSettings>): Promise<void> {
  const current = await getSettings();
  const updated = { ...current, ...settings };
  await AsyncStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
}

// Last used method
export async function getLastMethod(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.LAST_METHOD);
}

export async function setLastMethod(methodId: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.LAST_METHOD, methodId);
}

// Stats
export async function getBrewStats() {
  const history = await getBrewHistory();
  if (history.length === 0) {
    return { totalBrews: 0, favoriteMethod: null, averageRating: 0 };
  }

  const methodCounts: Record<string, number> = {};
  let totalRating = 0;

  history.forEach(entry => {
    methodCounts[entry.methodName] = (methodCounts[entry.methodName] || 0) + 1;
    totalRating += entry.rating;
  });

  const favoriteMethod = Object.entries(methodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  return {
    totalBrews: history.length,
    favoriteMethod,
    averageRating: Math.round((totalRating / history.length) * 10) / 10,
  };
}
