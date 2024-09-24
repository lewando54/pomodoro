/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { LinearGradientProps } from "expo-linear-gradient";

const tintColorLight = '#0a7ea4';
const tintColorDark = '#ccc';

export const Colors: {[key in Themes]: {[key in ColorNames]: string}} = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
  violet: {
    text: '#f2e0ff',
    background: '#2c1040',
    tint: '#9217e8',
    icon: '#997dad',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#6A0DAD',
  },
  blue: {
    text: '#053654',
    background: '#57b7f2',
    tint: '#0886d4',
    icon: '#0b74b5',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#4269ff',
  },
  pink: {
    text: '#63335e',
    background: '#fcdcf9',
    tint: '#bf7cb7',
    icon: '#bf7cb7',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#ff9a44',
  },
};

export const ThemesIconSettings: {[key in ThemesWSystem]: LinearGradientProps} = {
  light: {
    colors: ['#aaa', '#fff'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 }
  },
  dark: {
    colors: ['#222', '#555'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 }
  },
  violet: {
    colors: ['#2d054a', '#611b94'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 }
  },
  blue: {
    colors: ['#0886d4', '#57b7f2'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 }
  },
  pink: {
    colors: ['#bf7cb7', '#fcdcf9'],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 }
  },
  system: {
    colors: ['#333', '#fff'],
    locations: [0.5, 0.5],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 }
  }
};

export enum Themes {
  light = 'light',
  dark = 'dark',
  violet = 'violet',
  blue = 'blue',
  pink = 'pink',
}

export const ThemeNamesDict: {[key in ThemesWSystem]: string} = {
  'light': 'Light',
  'dark': 'Dark',
  'violet': 'Dark Violet',
  'blue': 'Blue',
  'pink': 'Pink',
  'system': 'System'
}

export type ThemesWSystem = Themes | 'system';

export enum ColorNames {
  text = 'text',
  background = 'background',
  tint = 'tint',
  icon = 'icon',
  tabIconDefault = 'tabIconDefault',
  tabIconSelected = 'tabIconSelected',
}
