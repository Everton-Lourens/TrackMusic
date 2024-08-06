// HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

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


export default HomeScreen;
