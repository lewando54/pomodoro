import { ColorNames } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Stack } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
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
  );
}
