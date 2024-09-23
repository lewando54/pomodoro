import { ColorNames } from '@/constants/Colors';
import { AppThemeContext } from '@/contexts/AppThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react';

function calculateColorBrightness(color: string) {
  const r = parseInt(color.substring(1, 2), 16);
  const g = parseInt(color.substring(3, 2), 16);
  const b = parseInt(color.substring(5, 2), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

export default function TabLayout() {
  const color = useThemeColor(ColorNames.background);
  const brightness = calculateColorBrightness(useThemeColor(ColorNames.background));

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_bottom',
          animationDuration: 100,
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Home',
            contentStyle: {
              backgroundColor: useThemeColor(ColorNames.background),
            }
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerShown: true,
            headerTitleStyle: {
              color: useThemeColor(ColorNames.text),
            },
            headerTintColor: useThemeColor(ColorNames.text),
            headerStyle: {
              backgroundColor: useThemeColor(ColorNames.background),
            },
            contentStyle: {
              backgroundColor: useThemeColor(ColorNames.background),
            }
          }}
        />
      </Stack>
      <StatusBar backgroundColor={color} style={brightness > 125 ? 'light' : 'dark'} />
    </>
  );
}
