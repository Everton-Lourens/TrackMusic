import * as React from 'react';
import { View, Text } from 'react-native';
import { Loading, Home, Songs, Playing, Search, Favourite, Recent, Playlists, Playlist } from '../screens/screens';
import { SCREENS } from '../constants';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <Stack.Screen name={SCREENS.SEARCH} component={Search} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.FAVOURITE} component={Favourite} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.RECENT} component={Recent} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.PLAYLISTS} component={Playlists} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.PLAYLIST} component={Playlist} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
};

export default function Index() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};
//const Index = () => {
//export default Index;