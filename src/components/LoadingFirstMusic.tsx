import TrackPlayer, { State } from "react-native-track-player";
import { Storage } from "../helpers";
import { getStorageTimeTrack } from "./StorageTimeTrack";

export async function LoadingFirstMusic(force = false, firstSong = null, positionTrack = 0) {
	try {
		const [isPlaying, currentQueue] = await Promise.all([
			TrackPlayer.getState(),
			TrackPlayer.getQueue(),
		]);

		const shouldPlay =
			force ||
			!currentQueue?.length ||
			[State.Stopped, State.Ended, State.None, State.Error].includes(isPlaying);

		if (shouldPlay) {

			const shuffle = await Storage.get('shuffle', false) == 'true' ? true : false;
			const mp3Files = await Storage.get('mp3Files', true);
			if (shuffle) {
				mp3Files.sort(() => Math.random() - 0.5);
			}
			const putMusicFirst = firstSong ? firstSong : await Storage.get('lastPlayedSong', true);
			if (putMusicFirst !== null) {
				await TrackPlayer.skip(0); // stores the index of the last song, this makes the cache go back to the beginning
				const index = mp3Files.findIndex((item: any) => item.id === putMusicFirst.id);
				if (index !== -1) {
					const [foundSong] = mp3Files.splice(index, 1);
					mp3Files.unshift(foundSong);
					await TrackPlayer.setQueue(mp3Files);
				}
			} else {
				await TrackPlayer.setQueue(mp3Files);
			}
			await getStorageTimeTrack();
			!!positionTrack && await TrackPlayer.seekTo(positionTrack);
		}
	} catch (error) {
		console.error("Error LoadingFirstMusic: added music", error);
	}
}