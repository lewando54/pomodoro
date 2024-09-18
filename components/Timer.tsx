import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { ThemedText } from './ThemedText'
import Svg, { Circle, ClipPath, Defs, Path, Polygon, Rect } from 'react-native-svg'
import IconButton from './IconButton'
import { useThemeColor } from '@/hooks/useThemeColor'
import Animated, { Easing, Extrapolation, interpolate, runOnJS, useAnimatedProps, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'

export default function Timer(
    { lightColor, darkColor }: { lightColor?: string; darkColor?: string }
) {
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const barColor = useThemeColor({ light: lightColor, dark: darkColor }, 'tint');

    const animatedMaskValue = useSharedValue(0);

    const AnimatedCircle = Animated.createAnimatedComponent(Circle);

    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: animatedMaskValue.value,
      }));

    const [isPlaying, setIsPlaying] = useState(false);

    const [time, setTime] = useState(10000);

    const onPress = () => {
        setIsPlaying(() => true);
        animatedMaskValue.value = withSequence(withTiming(-1000, {duration: 11000, easing: Easing.linear}), withTiming(0, {duration: 1000, easing: Easing.bounce}, () => {
                runOnJS(setIsPlaying)(false);
                runOnJS(setTime)(10000);
            }
        ));
        console.log(animatedMaskValue.value);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying) {
                setTime((prevTime) => prevTime - 1000);
            }
        }, 1000);

        return () => clearInterval(interval);
    });

    return (
        <View style={styles.timerContainer}>
            <Svg height={400} width={400} style={{position: 'absolute', transform: [{rotate: '-90deg'}] }}>
                <AnimatedCircle r='150' cx="200" cy="200" fill={color}
                        stroke={barColor}
                        strokeWidth="10"
                        strokeDasharray={'300%'}
                        animatedProps={animatedProps}
                />
            </Svg>
            <ThemedText style={{fontSize: 24, marginBottom: 20}}>{time / 1000}</ThemedText>
            {isPlaying ? 
                <View style={{flexDirection: 'row'}}>
                    <IconButton iconSettings={{name: 'pause', size: 40}} onClick={() => setIsPlaying(false)} />
                    <IconButton iconSettings={{name: 'stop', size: 40}} onClick={() => setIsPlaying(false)} />
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
