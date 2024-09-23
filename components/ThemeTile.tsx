import { ColorNames } from '@/constants/Colors'
import React from 'react'
import { View, StyleSheet, Pressable } from 'react-native'
import { ThemedText } from './ThemedText'

export default function ThemeTile(
    { name, colors, selected, onPress }: {name: string, colors: {[key in ColorNames]: string}, selected?: boolean, onPress: () => void}
) {
  return (
    <Pressable style={[styles.wrapper, {borderColor: selected ? '#F00' : 'transparent'}]} onPress={onPress}>
        <View style={styles.boxesWrapper}>
            {Object.keys(colors).map((color) => {
                return <View key={color} style={[styles.box, {backgroundColor: colors[color as ColorNames]}]} />
            })}
        </View>
        <ThemedText>{name}</ThemedText>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    box: {
        width: 20,
        height: 20,
    },
    boxesWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 60,
    },
    wrapper: {
        flex: 1,
        flexDirection: 'column',
        gap: 60,
        width: 75,
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 15,
    }
});
