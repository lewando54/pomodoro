import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Svg, { Circle, ClipPath, Defs, Path, Polygon, Rect } from 'react-native-svg'
import IconButton from './IconButton'
import { useThemeColor } from '@/hooks/useThemeColor'
import Animated, { cancelAnimation, Easing, interpolate, runOnJS, useAnimatedProps, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import { Audio } from 'expo-av'
import { Sound } from 'expo-av/build/Audio'
import Countdown, { ICountdownRef } from './Countdown'
import { ColorNames } from '@/constants/Colors'

export default function Timer(
    { lightColor, darkColor }: { lightColor?: string; darkColor?: string }
) {
    const color = useThemeColor(ColorNames.background);
    const barColor = useThemeColor(ColorNames.tint);

    const pomodoroCycles = [25, 5, 25, 5, 25, 5, 25, 15];

    const countdownRef = React.createRef<ICountdownRef>();

    const [currentCycle, setCurrentCycle] = useState(0);

    const [sound, setSound] = useState<Sound>();

    async function playDingSound() {
        const { sound } = await Audio.Sound.createAsync(require('@/assets/audio/ding.mp3'));
        setSound(sound);
        await sound.playAsync();
    }

    async function stopSound() {
        if(sound?._loaded)
            await sound?.stopAsync();
    }

    const r = 150;
    const circumference = Math.ceil(2 * Math.PI * r);

    const animatedMaskValue = useSharedValue(0);

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: interpolate(animatedMaskValue.value, [0, 1], [2 * circumference, circumference]),
      }));

    const [isPlaying, setIsPlaying] = useState(false);

    const onPress = () => {
        setIsPlaying(() => true);
        countdownRef.current?.start();
        const time = countdownRef.current?.getTime() || 0;
        const calculatedTime = 60000 * pomodoroCycles[currentCycle] - (60000 * pomodoroCycles[currentCycle] - time) + 10000;
        animatedMaskValue.value = withSequence(withTiming(1, {duration: calculatedTime, easing: Easing.linear}), withTiming(0, {duration: 1000, easing: Easing.bounce}, (finished) => {
            runOnJS(setIsPlaying)(false);
            runOnJS(stopSound)();
            if(finished) {
                runOnJS(setCurrentCycle)((currentCycle + 1) % pomodoroCycles.length);
                runOnJS(playDingSound)();
            }
        }));
    }

    function stopTimer() {
        setIsPlaying(false);
        cancelAnimation(animatedMaskValue);
        animatedMaskValue.value = 0;
        stopSound();
        countdownRef.current?.stop();
        setCurrentCycle((prevCycle) => (prevCycle + 1) % pomodoroCycles.length);
    }

    function pauseTimer() {
        setIsPlaying(false);
        const currValue = animatedMaskValue.value;
        //cancelAnimation(animatedMaskValue);
        animatedMaskValue.value = currValue;
        countdownRef.current?.pause();
        stopSound();
    }

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
            <Countdown
                pomodoroCycles={pomodoroCycles}
                currentCycle={currentCycle}
                isPlaying={isPlaying}
                ref={countdownRef}
            />
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
