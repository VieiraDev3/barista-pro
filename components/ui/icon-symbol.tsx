// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * SF Symbols to Material Icons mappings for Barista Pro
 */
const MAPPING = {
  // Navigation tabs
  "house.fill": "home",
  "book.fill": "menu-book",
  "timer": "timer",
  "compass.drawing": "explore",
  "person.fill": "person",
  // Common UI
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "chevron.left": "chevron-left",
  "chevron.down": "expand-more",
  "chevron.up": "expand-less",
  "xmark": "close",
  "xmark.circle.fill": "cancel",
  "plus": "add",
  "minus": "remove",
  "checkmark": "check",
  "checkmark.circle.fill": "check-circle",
  "star.fill": "star",
  "star": "star-border",
  "heart.fill": "favorite",
  "heart": "favorite-border",
  "bookmark.fill": "bookmark",
  "bookmark": "bookmark-border",
  "square.and.arrow.up": "share",
  "trash": "delete",
  "pencil": "edit",
  "magnifyingglass": "search",
  "bell.fill": "notifications",
  "gear": "settings",
  "info.circle": "info",
  "arrow.left": "arrow-back",
  "arrow.right": "arrow-forward",
  "arrow.clockwise": "refresh",
  "play.fill": "play-arrow",
  "pause.fill": "pause",
  "stop.fill": "stop",
  "speaker.wave.2.fill": "volume-up",
  "speaker.slash.fill": "volume-off",
  "drop.fill": "water-drop",
  "flame.fill": "local-fire-department",
  "leaf.fill": "eco",
  "clock.fill": "access-time",
  "calendar": "calendar-today",
  "chart.bar.fill": "bar-chart",
  "slider.horizontal.3": "tune",
  "photo": "photo",
  "camera.fill": "camera-alt",
  "mic.fill": "mic",
  "waveform": "graphic-eq",
  "moon.fill": "dark-mode",
  "sun.max.fill": "light-mode",
  "cup.and.saucer.fill": "coffee",
  "wineglass": "wine-bar",
  "fork.knife": "restaurant",
  "thermometer": "thermostat",
  "scalemass.fill": "scale",
  "list.bullet": "list",
  "square.grid.2x2.fill": "grid-view",
  "arrow.up.arrow.down": "swap-vert",
  "exclamationmark.triangle.fill": "warning",
  "lock.fill": "lock",
  "eye.fill": "visibility",
  "eye.slash.fill": "visibility-off",
  "globe": "language",
  "wifi": "wifi",
  "battery.100": "battery-full",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
