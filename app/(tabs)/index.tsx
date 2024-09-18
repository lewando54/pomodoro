import { Image, StyleSheet, Platform, View, Pressable } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import CogWheelButton from '@/components/CogWheelButton';
import Timer from '@/components/Timer';

export default function HomeScreen() {

  const rotationAnimation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
    marginLeft: 'auto',
  }));

  const onCogClick = () => {
    rotationAnimation.value = withSequence(withTiming(180, { duration: 500 }), withTiming(0, { duration: 0 }));
  };

  return (
    <View style={{display: 'flex', paddingVertical: 60, gap: 10, paddingHorizontal: 30, flexDirection: 'column', flex: 1, height: '100%'}}>
      <CogWheelButton />
      <Pressable onPress={() => {}} style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <Timer />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
