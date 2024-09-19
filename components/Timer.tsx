import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Svg, { Circle, ClipPath, Defs, Path, Polygon, Rect } from 'react-native-svg'
import IconButton from './IconButton'
import { useThemeColor } from '@/hooks/useThemeColor'
import Animated, { cancelAnimation, Easing, runOnJS, useAnimatedProps, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'

export default function Timer(
    { lightColor, darkColor }: { lightColor?: string; darkColor?: string }
) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const barColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

    const pomodoroCycles = [25, 5, 25, 5, 25, 5, 25, 15];

    const [currentCycle, setCurrentCycle] = useState(0);

    const [sound, setSound] = useState<Sound>();

    async function playDingSound() {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/ding.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    async function playTickingSound() {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/ticking.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    async function stopSound() {
        await sound?.stopAsync();
    }

    const r = 150;
    const circumference = 2 * Math.PI * r;

    const animatedMaskValue = useSharedValue(2 * circumference);

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: animatedMaskValue.value,
      }));

    const [isPlaying, setIsPlaying] = useState(false);

    const [time, setTime] = useState(60000 * pomodoroCycles[currentCycle]);

    const onPress = () => {
        setIsPlaying(() => true);

        animatedMaskValue.value = withSequence(withTiming(circumference, {duration: 60000 * pomodoroCycles[currentCycle] - (60000 * pomodoroCycles[currentCycle] - time), easing: Easing.linear}), withTiming(2 * circumference, {duration: 1000, easing: Easing.bounce}, (finished) => {
            runOnJS(setIsPlaying)(false);
            runOnJS(stopSound)();
            if(finished) {
                runOnJS(setTime)(60000 * pomodoroCycles[(currentCycle + 1) % pomodoroCycles.length]);
                runOnJS(setCurrentCycle)((prevCycle) => (prevCycle + 1) % pomodoroCycles.length);
            }
            }
        ));
    }

    function stopTimer() {
        setIsPlaying(false);
        cancelAnimation(animatedMaskValue);
        animatedMaskValue.value = 2 * circumference;
        stopSound();
        setTime(60000 * pomodoroCycles[(currentCycle + 1) % pomodoroCycles.length]);
        setCurrentCycle((prevCycle) => (prevCycle + 1) % pomodoroCycles.length);
    }

    function pauseTimer() {
        setIsPlaying(false);
        const currValue = animatedMaskValue.value;
        cancelAnimation(animatedMaskValue);
        animatedMaskValue.value = currValue;
        stopSound();
        setTime(time);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && time > 0) {
                playTickingSound();
                setTime((prevTime) => prevTime - 1000);
            }
            else if(time === 0) {
                playDingSound();
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    useEffect(() => {
        return sound
          ? () => {
              sound.unloadAsync();
            }
          : undefined;
      }, [sound]);

    return (
        <View style={styles.timerContainer}>
            <Svg height={400} width={400} style={{position: 'absolute', transform: [{rotate: '-90deg'}] }}>
                <AnimatedCircle r={r} cx="200" cy="200" fill={color}
                        stroke={barColor}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        animatedProps={animatedProps}
                />
            </Svg>
            <ThemedText style={{fontSize: 24, marginBottom: 20}}>{Math.floor(time / 60000).toFixed(0)}:{(time % 60000 / 1000).toString().padStart(2, '0')}</ThemedText>
            {isPlaying ? 
                <View style={{flexDirection: 'row'}}>
                    <IconButton iconSettings={{name: 'pause', size: 40}} onClick={() => pauseTimer()} />
                    <IconButton iconSettings={{name: 'stop', size: 40}} onClick={() => stopTimer()} />
                </View>
                :
            <IconButton iconSettings={{name: 'play', size: 40}} onClick={onPress} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    timerContainer: {
        fontSize: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        flex: 1,
    },
    circle: {
        
    }
});
