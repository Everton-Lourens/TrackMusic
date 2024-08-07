import React, { useEffect } from 'react';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

async function requestReadStoragePermission() {
  try {
    if (Platform.OS === 'android' && Platform.Version >= 23) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permissão para acessar arquivos de mídia',
          message: 'Este aplicativo precisa acessar seus arquivos de mídia para reproduzir MP3.',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão concedida');
      } else {
        console.log('Permissão negada');
      }
    }
  } catch (err) {
    console.warn(err);
  }
}

const App = () => {
  useEffect(() => {
    requestReadStoragePermission();
  }, []);

  return null;
};

export default App;
