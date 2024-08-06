<<<<<<< HEAD
/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
=======
import { AppRegistry } from 'react-native';
import App from '@/App';
import { name as appName } from '@/app.json';
import { playbackService } from '@/src/constants/playbackService'
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => playbackService)

AppRegistry.registerComponent(appName, () => App);
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
