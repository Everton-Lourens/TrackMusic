<<<<<<< HEAD
import React from 'react';
import { Provider as RRProvider } from 'react-redux';
import store from '@/src/store';
import Screens from '@/src/screens';

export default function App() {
  return (
    <RRProvider store={store}>
      <Screens />
    </RRProvider>
  );
}

=======
import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }: any) {
  return (
    <View>
      <Text style={{ fontSize: 24, color: 'red' }}>Home Screen</Text>
      <Button
        title="Go to Detail Screen"
        onPress={() => navigation.navigate('Details')}
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

const Index = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
>>>>>>> 13d87ab274aeb51725fe308104972a9cf65c36f7
