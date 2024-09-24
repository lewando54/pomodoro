import { Colors, Themes, ThemesWSystem } from '@/constants/Colors'
import React from 'react'
import ThemeTile from './ThemeTile'
import { StyleSheet, useColorScheme, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ThemeTileList(
  { lightColor, darkColor, selectedName, onChange }: { lightColor?: string; darkColor?: string, selectedName: string | null, onChange: (theme: string) => void }
) {

  const scheme = useColorScheme();

  const themeTiles = Object.keys(Themes).map((theme) => 
      <ThemeTile name={theme as ThemesWSystem} key={theme} colors={Colors[theme as keyof typeof Colors]} selected={theme === selectedName} onPress={() => onChange(theme)} />
  );

  themeTiles.unshift(
    <ThemeTile name={'system'} key={'system'} colors={Colors[scheme ?? 'light']} selected={selectedName === 'system'} onPress={() => onChange('system')} />
  )

  return (
    <View style={styles.wrapper}>
      {themeTiles}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: 24,
  }
});
