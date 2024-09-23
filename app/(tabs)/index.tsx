import { StyleSheet, View, Pressable } from 'react-native';

import CogWheelButton from '@/components/CogWheelButton';
import Timer from '@/components/Timer';

export default function HomeScreen() {

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
