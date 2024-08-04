import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Loading, Home, Songs, Playing, Search, Favourite, Recent, Playlists, Playlist } from '@/src/screens/screens';
import { SCREENS } from '@/src/constants';

const Tab = createMaterialTopTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={SCREENS.HOME} component={Home} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={SCREENS.SONGS} component={Songs} options={{ tabBarLabel: 'Songs' }} />
      <Tab.Screen name={SCREENS.SEARCH} component={Search} options={{ tabBarLabel: 'Search' }} />
      <Tab.Screen name={SCREENS.FAVOURITE} component={Favourite} options={{ tabBarLabel: 'Favourite' }} />
      <Tab.Screen name={SCREENS.RECENT} component={Recent} options={{ tabBarLabel: 'Recent' }} />
      <Tab.Screen name={SCREENS.PLAYLISTS} component={Playlists} options={{ tabBarLabel: 'Playlists' }} />
    </Tab.Navigator>
  );
};

const Index = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default Index;
