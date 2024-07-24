import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener('remote-pause', () => {
    TrackPlayer.pause();
  });

  // Outros eventos de controle remoto, se necessário
};


export async function play() {
  return Alert.alert('Playing');
}