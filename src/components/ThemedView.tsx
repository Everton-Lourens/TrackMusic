import { View, type ViewProps } from 'react-native';

<<<<<<< HEAD
import { useThemeColor } from '../hooks/useThemeColor';
=======
import { useThemeColor } from '@/src/hooks/useThemeColor';
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
