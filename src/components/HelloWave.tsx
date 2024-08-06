<<<<<<< HEAD
/*
=======
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';

<<<<<<< HEAD
import { ThemedText } from './ThemedText';
=======
import { ThemedText } from '@/src/components/ThemedText';
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee

export function HelloWave() {
  const rotationAnimation = useSharedValue(0);

  rotationAnimation.value = withRepeat(
    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
    4 // Run the animation 4 times
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotationAnimation.value}deg` }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <ThemedText style={styles.text}>👋</ThemedText>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    lineHeight: 32,
    marginTop: -6,
  },
});
<<<<<<< HEAD

*/
=======
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
