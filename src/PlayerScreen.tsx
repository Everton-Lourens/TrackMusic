// screens/PlayerScreen.js

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const PlayerScreen = ({ route, navigation }: any) => {
  const { trackId } = route.params;

  // Logic to play the track would go here

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Playing Track {trackId}</Text>
      <Button title="Back to Home" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
  },
});

export default PlayerScreen;
