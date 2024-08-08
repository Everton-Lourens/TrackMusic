import * as React from 'react';
import { Platform, Linking, Alert, View, Button, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { check, request, PERMISSIONS, RESULTS, requestMultiple } from 'react-native-permissions';
import { Provider as RRProvider } from 'react-redux';
import store from './src/store';
import Screens from './src/screens';

export default function App() {
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [showText, setShowText] = React.useState(false);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      let result: any = await request(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO);
      if (typeof result === 'string' && result === 'unavailable') {
        result = await requestMultiple([
          PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
          PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        ]);
      }
      handlePermissionResult(result);
    } else if (Platform.OS === 'ios') {
      // Para o iOS, use permissões de biblioteca de mídia
      const readPermission = await check(PERMISSIONS.IOS.MEDIA_LIBRARY);

      if (readPermission === RESULTS.BLOCKED) {
        showPermissionAlert();
      } else if (readPermission !== RESULTS.GRANTED) {
        const requestRead = await request(PERMISSIONS.IOS.MEDIA_LIBRARY);
        if (requestRead === RESULTS.GRANTED) {
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
    if (result === RESULTS.GRANTED) {
      setPermissionGranted(true);
    } else if (
      result[PERMISSIONS.ANDROID.READ_MEDIA_AUDIO] === RESULTS.GRANTED || result[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === RESULTS.GRANTED || result[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === RESULTS.GRANTED) {
      setPermissionGranted(true);
    } else {
      showPermissionAlert();
    }
  };

  const showPermissionAlert = () => {
    Alert.alert(
      'Permissão Necessária!',
      'Para acessar arquivos de música, você precisa habilitar as permissões de MÍDIA nas configurações do dispositivo.',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => { /*showPermissionAlert()*/ } },
        { text: 'Abrir Configurações', onPress: () => Linking.openSettings() }
      ]
    );
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShowText(true)
    }, 1000);
    requestPermissions();
  }, []);

  return permissionGranted ? (
    <RRProvider store={store}>
      <Screens />
    </RRProvider>
  ) :
    (<TouchableWithoutFeedback onPress={requestPermissions}>
      <View style={styles.container}>

        {showText && <Text style={styles.message}>
          Habilite as permissões de MÍDIA nas configurações do dispositivo.{'\n\n'}
          Clique aqui para iniciar.
        </Text>}

      </View>
    </TouchableWithoutFeedback>)
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  message: {
    textAlign: 'center',
    fontSize: 20,
    color: 'red',
    marginBottom: 20,
  },
});