/**
 * @format
 */
/*
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
*/

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import TrackPlayer from 'react-native-track-player';
// @ts-ignore
import service from '@/service';

// Registre o serviço
TrackPlayer.registerPlaybackService(() => service);

AppRegistry.registerComponent(appName, () => App);