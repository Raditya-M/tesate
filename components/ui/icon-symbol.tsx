// components/ui/icon-symbol.tsx

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// Tipe data untuk pemetaan ikon
type IconMapping = Record<string, ComponentProps<typeof MaterialIcons>['name']>;

/**
 * Pemetaan dari nama SF Symbols (iOS) ke Material Icons (Android/Web).
 * Jika kamu menambah ikon di TabLayout, pastikan namanya terdaftar di sini.
 */
const MAPPING = {
  // Bawaan Template
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'plus': 'add',
  'minus': 'remove',

  // Tambahan untuk aplikasi Sate Mang Saswi
  'info.circle': 'info',
  'cart.fill': 'shopping-cart',
  'bell': 'notifications',
  'person.circle': 'person',
} as IconMapping;

export type IconSymbolName = keyof typeof MAPPING;

/**
 * Komponen IconSymbol:
 * Menggunakan SF Symbols di iOS (jika tersedia secara native) 
 * dan fallback ke MaterialIcons di Android/Web.
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
  // Jika nama tidak ada di MAPPING, tampilkan ikon 'help' sebagai tanda error
  const iconName = MAPPING[name] || 'help-outline';
  
  return <MaterialIcons color={color} size={size} name={iconName} style={style} />;
}