/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

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
    text: '#ECEDEE',
    background: '#151718',
    tint: '#6A0DAD',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#6A0DAD',
  }
};

export enum Themes {
  light = 'light',
  dark = 'dark',
  violet = 'violet',
}

export enum ColorNames {
  text = 'text',
  background = 'background',
  tint = 'tint',
  icon = 'icon',
  tabIconDefault = 'tabIconDefault',
  tabIconSelected = 'tabIconSelected',
}
