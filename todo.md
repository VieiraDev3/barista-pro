# Barista Pro — TODO

## Branding & Setup
- [x] Generate app logo (coffee cup / bean icon, gold on dark)
- [x] Update theme colors (dark coffee palette: gold, brown, black)
- [x] Update app.config.ts with branding
- [x] Configure 5-tab navigation structure

## Core Data Layer
- [x] Create brewing methods JSON config (V60, Melitta, Chemex, French Press, Aeropress, Moka, Cold Brew, Espresso)
- [x] Create AsyncStorage persistence layer (brew history, favorites, settings)
- [x] Define TypeScript types for all data models

## Tab 1: Home / Dashboard
- [x] Dashboard screen with greeting header
- [x] Quick Brew card (shortcut to last method)
- [x] Recent Brews horizontal scroll
- [x] Tip of the Day card
- [x] Featured Method banner
- [x] Quick method chips row

## Tab 2: Knowledge Encyclopedia
- [x] Knowledge hub screen with category grid
- [x] Grains & Beans screen (bean types, processing, roast levels)
- [x] Brewing Methods list screen
- [x] Brewing Method detail screen (tech sheet + steps)
- [x] Barista Techniques screen (TDS, water, tamping)

## Tab 3: Guided Brew (Smart Timer)
- [x] Method selection screen
- [x] Setup / Before-Brew configuration screen (volume, ratio, grind)
- [x] Auto-calculation logic (dose, water, temperature)
- [x] Smart Timer screen with phase-based steps
- [x] Timer logic (Bloom phase, Pour phases, completion)
- [x] Pause/Resume timer functionality
- [x] Quick notes during brew
- [x] TTS voice guidance (expo-speech)
- [x] Keep screen awake during brew (expo-keep-awake)
- [x] Post-Brew tasting screen (sensory sliders)
- [x] Flavor notes selector (chips)
- [x] Save brew to diary (AsyncStorage)

## Tab 4: Explore / Community
- [x] Explore screen with community recipes feed
- [x] Latte Art section (Heart, Rosetta, Tulip tutorials)
- [x] Bean Anatomy diagram and layers
- [x] Community recipe cards

## Tab 5: Profile
- [x] Profile screen with brew stats (total brews, avg rating, favorite method)
- [x] Brew History list
- [x] Brew detail view with full sensorial data
- [x] Settings screen (TTS, haptic, default ratio)

## Polish & Accessibility
- [x] Dark theme applied consistently
- [x] Gold accent color on all interactive elements
- [x] Haptic feedback on primary actions
- [x] All tab icons mapped in icon-symbol.tsx
- [x] Unit tests for brewing calculations and data layer (19/19 passing)
