import { ColorNames } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Pressable } from 'react-native'

export interface IIconButtonProps { 
    onClick: () => void;
    iconSettings: React.ComponentProps<typeof Ionicons>;
};

export default function IconButton(
    { onClick, iconSettings }: IIconButtonProps
) {
  const color = useThemeColor(ColorNames.icon);

  return (
    <Pressable onPressIn={onClick}>
        <Ionicons {...iconSettings} color={color}></Ionicons>
    </Pressable>
  )
}
