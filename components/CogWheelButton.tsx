import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { Link, router, useNavigation } from "expo-router";
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from "react-native-reanimated";
import { Colors } from "react-native/Libraries/NewAppScreen";
import IconButton from "./IconButton";

export default function CogWheelButton(
    { lightColor, darkColor }: { lightColor?: string; darkColor?: string }
) {
    const rotationAnimation = useSharedValue(0);
  
    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotationAnimation.value}deg` }],
      marginLeft: 'auto',
    }));
  
    const onCogClick = () => {
      rotationAnimation.value = withSequence(withTiming(180, { duration: 500 }), withTiming(0, { duration: 0 }));
      router.navigate('/settings');
    };

    return (
        <Animated.View style={animatedStyle}><IconButton onClick={onCogClick} iconSettings={{name: 'cog', size: 40}} /></Animated.View>
    )
};