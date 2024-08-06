<<<<<<< HEAD
import * as React from 'react';
import { Platform, Linking, Alert } from 'react-native';
import { check, request, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { Provider as RRProvider } from 'react-redux';
import store from './src/store';
import Screens from './src/screens';



export default function App() {
  const [permissionGranted, setPermissionGranted] = React.useState(false);

  React.useEffect(() => {
=======
import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { Provider as RRProvider } from 'react-redux';
import { check, request, requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import store from '@/src/store';
import Screens from '@/src/screens';

export default function App() {
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        ]);
        handlePermissionResult(result);
      } else if (Platform.OS === 'ios') {
        // Para o iOS, use permissões de biblioteca de mídia
        const readPermission = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);
        const writePermission = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);

        if (readPermission === RESULTS.BLOCKED || writePermission === RESULTS.BLOCKED) {
          showPermissionAlert();
        } else if (readPermission !== RESULTS.GRANTED || writePermission !== RESULTS.GRANTED) {
          const requestRead = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
          const requestWrite = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
          if (requestRead === RESULTS.GRANTED && requestWrite === RESULTS.GRANTED) {
            setPermissionGranted(true);
          } else {
            showPermissionAlert();
          }
        } else {
          setPermissionGranted(true);
        }
      }
    };

    const handlePermissionResult = (result: any) => {
      if (
        result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED &&
        result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED
      ) {
        setPermissionGranted(true);
      } else if (
<<<<<<< HEAD
        result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED || result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.BLOCKED) {
=======
        result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.BLOCKED ||
        result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.BLOCKED
      ) {
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
        showPermissionAlert();
      }
    };

    const showPermissionAlert = () => {
      Alert.alert(
        'Permissão Necessária',
        'Para acessar arquivos de música, você precisa habilitar as permissões nas configurações do dispositivo.',
        [
          { text: 'Cancelar', style: 'cancel', onPress: () => showPermissionAlert() },
          { text: 'Abrir Configurações', onPress: () => Linking.openSettings() }
        ]
      );
    };

    requestPermissions();
  }, []);

<<<<<<< HEAD
  return (
    <RRProvider store={store}>
      <Screens />
    </RRProvider>
  );
};
=======
  return permissionGranted ? (
    <RRProvider store={store}>
      <Screens />
    </RRProvider>
  ) : null;
}
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
