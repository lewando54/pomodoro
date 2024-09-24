import { ColorNames, ThemeNamesDict, Themes, ThemesIconSettings, ThemesWSystem } from '@/constants/Colors'
import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { ThemedText } from './ThemedText'
import { LinearGradient } from 'expo-linear-gradient'
import { Theme } from '@react-navigation/native'

export default function ThemeTile(
    { name, colors, selected, onPress }: {name: ThemesWSystem, colors: {[key in ColorNames]: string}, selected?: boolean, onPress: () => void}
) {
  return (
    <Pressable style={[styles.wrapper]} onPress={onPress}>
        <View style={[styles.circleWrapper, {borderColor: selected ? '#4269ff' : 'transparent'}]}>
            <LinearGradient style={[styles.circle]} {...ThemesIconSettings[name]}>
            </LinearGradient>
        </View>
        <ThemedText style={{textAlign: 'center'}}>{ThemeNamesDict[name]}</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    circle: {
        width: 70,
        height: 70,
        borderRadius: 120,
    },
    circleWrapper: {
        borderRadius: 120,
        borderWidth: 4,
    },
    wrapper: {
        flexDirection: 'column',
        gap: 10,
        width: 70,
        alignItems: 'center',
        borderRadius: 15,
    }
});
