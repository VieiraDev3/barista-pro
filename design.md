# Barista Pro — Mobile App Design Plan

## Brand Identity

**App Name:** Barista Pro  
**Tagline:** "From Bean to Cup — Perfected."  
**Target Audience:** Beginners learning coffee basics → Professional baristas seeking precision tools.

### Color Palette (Dark Mode Default)

| Token | Dark Value | Light Value | Usage |
|-------|-----------|-------------|-------|
| `background` | `#0D0B08` | `#FAF7F2` | Screen backgrounds |
| `surface` | `#1A1612` | `#F0EBE3` | Cards, sheets, panels |
| `primary` | `#C8963E` | `#A67C2E` | Gold accent — CTAs, active tabs |
| `foreground` | `#F5EFE6` | `#1C1008` | Primary text |
| `muted` | `#8A7B6A` | `#6B5A47` | Secondary text, labels |
| `border` | `#2E2720` | `#D4C4B0` | Dividers, card borders |
| `success` | `#5BAD6F` | `#3D8A50` | Completion states |
| `warning` | `#E8A838` | `#C8882A` | Timer alerts |
| `error` | `#D95F5F` | `#B84040` | Error states |

**Typography:**
- Headers: System font bold (SF Pro Display / Roboto)
- Body: System font regular
- Accent numbers (timer): Monospaced font for precision feel

---

## Screen List

### Tab 1: Home (Dashboard)
- **Quick Brew** card — shortcut to last used brewing method
- **Saved Recipes** horizontal scroll list (last 3)
- **Tip of the Day** card with coffee knowledge snippet
- **Featured Method** banner (rotates daily)
- Header with greeting + coffee cup icon

### Tab 2: Knowledge (Encyclopedia)
- **Category Grid** — 3 categories: Grains & Roasts, Brewing Methods, Barista Techniques
- **Grains & Roasts** sub-screen:
  - Bean types list (Arabica, Robusta, Conilon, Geisha, Bourbon, Catuai)
  - Processing methods (Natural, Washed, Honey, Fermented)
  - Roast levels with flavor wheel (Light, Medium, Dark)
- **Brewing Methods** sub-screen:
  - Method cards (V60, Melitta, Chemex, French Press, Aeropress, Moka, Cold Brew, Espresso)
  - Each method detail: Tech Sheet + Step-by-Step instructions
- **Barista Techniques** sub-screen:
  - TDS & Extraction quality control
  - Water management (temperature, minerals)
  - Tamping for espresso

### Tab 3: Brew (Guided Brewing — Heart of the App)
- **Method Selection** screen — grid of brewing method cards
- **Setup Screen (Before Brew)**:
  - Method dropdown
  - Target volume (ml) input
  - Ratio slider (1:10 to 1:20)
  - Grind size visual selector (Fine → Coarse)
  - Auto-calculated: coffee dose (g), water weight (g), temperature (°C)
- **Smart Timer Screen (During Brew)**:
  - Large circular timer display
  - Phase indicator (Bloom → Pour 1 → Pour 2 → Done)
  - Step instructions text (animated)
  - Pause/Resume button
  - Quick notes input
  - TTS voice guidance
- **Post-Brew Tasting Screen (After Brew)**:
  - Sensory sliders: Body, Acidity, Sweetness, Bitterness (0–10)
  - Flavor notes selector (chips: Fruity, Chocolate, Nutty, Floral, Citrus, etc.)
  - Recipe name input
  - Save to Diary button

### Tab 4: Explore (Community)
- **Community Recipes** feed — card list with method, rating, author
- **Latte Art Gallery** — visual grid with tutorial cards
  - Heart, Rosetta, Tulip step-by-step animations
- **Bean Anatomy Tool** — zoom diagram of coffee bean cross-section
- **Featured Baristas** section

### Tab 5: Profile
- **Brew History** list (date, method, rating, notes)
- **Favorites** saved recipes
- **Stats** — total brews, favorite method, average rating
- **Settings** — theme toggle, TTS on/off, default ratio, units (g/oz)
- **About** section

---

## Key User Flows

### Flow 1: Guided Brew (Primary Flow)
1. Tap "Brew" tab → Method selection grid
2. Tap method card (e.g., V60) → Setup screen
3. Adjust volume, ratio, grind → Tap "Start Brewing"
4. Smart Timer screen → Tap "Begin" → Follow voice + text steps
5. Timer completes → Post-Brew screen opens automatically
6. Rate sensory attributes → Select flavor notes → Name & Save
7. Saved to Brew History → Confirmation animation

### Flow 2: Learn About Coffee
1. Tap "Knowledge" tab → Category grid
2. Tap "Brewing Methods" → Method list
3. Tap "V60" → Detail screen with tech sheet + steps
4. Tap "Brew This" button → Jumps to Guided Brew Flow (pre-filled)

### Flow 3: Quick Brew from Dashboard
1. Home screen → "Quick Brew" card shows last method
2. Tap → Goes directly to Setup screen with last settings pre-filled

### Flow 4: Review Brew History
1. Tap "Profile" tab → Brew History section
2. Scroll through past brews → Tap entry for detail
3. See full sensory notes, flavor tags, and brew parameters

---

## Component Design

### Cards
- Rounded corners: `rounded-2xl` (16px)
- Subtle shadow on dark: `shadow-sm`
- Border: 1px `border-border`
- Padding: `p-4` or `p-5`

### Buttons
- Primary: Gold background (`bg-primary`), dark text, `rounded-full`
- Secondary: Surface background, gold text border
- Destructive: Error color

### Timer Display
- Large circular progress ring (SVG)
- Monospace font for time digits
- Phase name above timer
- Animated step instruction below

### Tab Bar
- Dark background matching `background`
- Gold active tint (`primary`)
- 5 tabs: Home, Knowledge, Brew, Explore, Profile
- Custom icons for each tab

---

## Accessibility
- TTS voice guidance during timer (expo-speech)
- High contrast text on dark backgrounds
- Touch targets minimum 44×44pt
- Screen stays awake during brewing (expo-keep-awake)
