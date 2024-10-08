/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { playbackService } from './src/constants/playbackService'
import TrackPlayer from 'react-native-track-player';

TrackPlayer.registerPlaybackService(() => playbackService)

AppRegistry.registerComponent(appName, () => App);