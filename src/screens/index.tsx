import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Loading, Home } from '@/src/screens/screens';
import { SCREENS } from '@/src/constants';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View>
      <Text style={{ fontSize: 40, color: 'red', alignSelf: 'center' }}>Home Screen</Text>
      <Text style={{ fontSize: 25, color: 'blue', alignSelf: 'center' }}>Details:</Text>
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate(SCREENS.DETAILS)}
      />
      <Text style={{ fontSize: 25, color: 'blue', alignSelf: 'center' }}>Loading:</Text>
      <Button
        title="Go to Loading Screen"
        onPress={() => navigation.navigate(SCREENS.LOADING)}
      />
    </View>
  );
};

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 30, color: 'red' }}>Details Screen</Text>
    </View>
  );
}

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={SCREENS.LOADING}>
      <Stack.Screen name={SCREENS.LOADING} component={Loading} />
      <Stack.Screen name={SCREENS.HOME} component={Home} options={{ headerShown: false }} />
      <Stack.Screen name={SCREENS.DETAILS} component={DetailsScreen} options={{ headerShown: false }} />
      {/*<Stack.Screen name="Details" component={DetailsScreen} />*/}
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