import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loading, Home, Songs, Playing } from '@/src/screens/screens';
import { SCREENS } from '@/src/constants';

const Stack = createNativeStackNavigator();

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, color: 'red' }}>Details Screen</Text>
    </View>
  );
}

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.LOADING} >
      <Stack.Screen name={SCREENS.LOADING} component={Loading} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.HOME} component={Home} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.SONGS} component={Songs} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.PLAYING} component={Playing} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.DETAILS} component={DetailsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

const Index = () => {
  return (
    <NavigationContainer>
      <StackNavigation />
    </NavigationContainer>
  );
};

export default Index;