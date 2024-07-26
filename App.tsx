import { Provider as RRProvider } from 'react-redux';
import store from '@/src/store';
import Screens from '@/src/screens';

import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import RNFS from 'react-native-fs';

const requestAudioPermissions = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);

        if (
            granted['android.permission.READ_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
        ) {
            Alert.alert('Permissões necessárias não foram concedidas');
            return false;
        }
    } else {
        const res = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
        if (res !== RESULTS.GRANTED) {
            Alert.alert('Permissões necessárias não foram concedidas');
            return false;
        }
    }
    return true;
};


export default function App() {
    const [permissionGranted, setPermissionGranted] = React.useState(false);
    useEffect(() => {
        (async () => {
            const result = await requestAudioPermissions();
            setPermissionGranted(result);
        })();
    }, [permissionGranted]);

    return permissionGranted ? (
        <RRProvider store={store}>
            <Screens />
        </RRProvider>
    ) : null;
}
/*

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

*/
