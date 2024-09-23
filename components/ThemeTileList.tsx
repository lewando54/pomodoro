import { Colors, Themes } from '@/constants/Colors'
import React from 'react'
import ThemeTile from './ThemeTile'
import { StyleSheet, useColorScheme, View } from 'react-native'

export default function ThemeTileList(
  { lightColor, darkColor, selectedName, onChange }: { lightColor?: string; darkColor?: string, selectedName: string | null, onChange: (theme: string) => void }
) {

  const scheme = useColorScheme();

  const themeTiles = Object.keys(Themes).map((theme) => 
      <ThemeTile name={theme} key={theme} colors={Colors[theme as keyof typeof Colors]} selected={theme === selectedName} onPress={() => onChange(theme)} />
  );

  themeTiles.unshift(
    <ThemeTile name={'system'} key={'system'} colors={Colors[scheme ?? 'light']} selected={'system' === selectedName} onPress={() => onChange('system')} />
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
    gap: 30,
  }
});
