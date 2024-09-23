import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, useColorScheme } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ThemeTileList from '@/components/ThemeTileList';
import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThemeContext } from '@/contexts/AppThemeContext';
import { Themes } from '@/constants/Colors';

export default function SettingsScreen() {
  const { theme, setTheme } = useContext(AppThemeContext);

  const scheme = useColorScheme();

  const [storageTheme, setStorageTheme] = useState<string | null>(null);

  useEffect(() => {
    async function getTheme() {
      const savedTheme = await AsyncStorage.getItem('theme') ?? 'system';
        setStorageTheme(savedTheme);
    }
    getTheme();
  }, []);

  function handleThemeChange(theme: string) {
    if(theme === 'system') {
      setTheme(scheme as Themes);
    }
    else {
      setTheme(theme as Themes);
    }
    setStorageTheme(theme);
    AsyncStorage.setItem('theme', theme);
  }

  return (
    <View style={styles.container}>
      <ThemedText>Themes</ThemedText>
      <ThemeTileList selectedName={storageTheme as string} onChange={(theme) => handleThemeChange(theme as Themes)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    gap: 20,
  },
});
