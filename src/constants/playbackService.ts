import TrackPlayer, { Event } from 'react-native-track-player'
import { getStorageTimeTrack, setStorageTimeTrack } from '../components/StorageTimeTrack'
import { LoadingFirstMusic } from '../components/LoadingFirstMusic';

export const playbackService = async () => {
	TrackPlayer.addEventListener(Event.RemotePlay, async () => {
		await TrackPlayer.play();
		const isPlayingEnd: any = await TrackPlayer.getState();
		if (isPlayingEnd === 'playing') {
			await getStorageTimeTrack();
		} else {
			await TrackPlayer.pause();
			await LoadingFirstMusic(true, null, 0);
			await TrackPlayer.play();
		}
	})

	TrackPlayer.addEventListener(Event.RemotePause, async () => {
		await setStorageTimeTrack()
		TrackPlayer.pause()
	})

	TrackPlayer.addEventListener(Event.RemoteStop, async () => {
		TrackPlayer.stop()
	})

	TrackPlayer.addEventListener(Event.RemoteNext, () => {
		TrackPlayer.skipToNext()
	})

	TrackPlayer.addEventListener(Event.RemotePrevious, () => {
		TrackPlayer.skipToPrevious()
	})
}
