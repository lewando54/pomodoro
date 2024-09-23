import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { ThemedText } from './ThemedText'
import { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { Sound } from 'expo-av/build/Audio';
import { Audio } from 'expo-av'

export interface ICountdownRef { start: () => void, pause: () => void, stop: () => void, getTime: () => number };

export default forwardRef(function Countdown(
    props: {pomodoroCycles: number[], currentCycle: number, isPlaying: boolean}, ref
) {
    const {pomodoroCycles, currentCycle, isPlaying} = props;
    const opacity = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

    const [sound, setSound] = useState<Sound>();

    const [time, setTime] = useState(60000 * pomodoroCycles[currentCycle]);

    async function playTickingSound() {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/ticking.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    async function stopSound() {
        if(sound?._loaded)
            await sound?.stopAsync();
    }

    useImperativeHandle(ref, () => ({
        start: () => {
            cancelAnimation(opacity);
            opacity.value = 1;
        },
        pause: () => {
            opacity.value = withRepeat(withSequence(withDelay(700, withTiming(0, {duration: 0})), withDelay(700, withTiming(1, {duration: 0}))), -1, true);
            stopSound();
        },
        stop: () => {
            setTime(60000 * pomodoroCycles[(currentCycle + 1) % pomodoroCycles.length]);
            stopSound();
        },
        getTime: () => time,
    }), []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && time > 0) {
                playTickingSound();
                setTime((prevTime) => prevTime - 1000);
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        setTime(60000 * pomodoroCycles[currentCycle]);
    }, [currentCycle]);

    useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

    return (
        <ThemedText style={[{fontSize: 24, marginBottom: 20}, animatedStyle]}>{Math.floor(time / 60000).toFixed(0)}:{(time % 60000 / 1000).toString().padStart(2, '0')}</ThemedText>
    )
});
