import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Pressable } from 'react-native'

export interface IIconButtonProps { 
    lightColor?: string;
    darkColor?: string;
    onClick: () => void;
    iconSettings: React.ComponentProps<typeof Ionicons>;
};

export default function IconButton(
    { lightColor, darkColor, onClick, iconSettings }: IIconButtonProps
) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'icon');

  return (
    <Pressable onPress={onClick}>
        <Ionicons {...iconSettings} color={color}></Ionicons>
    </Pressable>
  )
}
