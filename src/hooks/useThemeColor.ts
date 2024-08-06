/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from 'react-native';

<<<<<<< HEAD
import { Colors } from '../constants/Colors';
=======
import { Colors } from '@/src/constants/Colors';
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
