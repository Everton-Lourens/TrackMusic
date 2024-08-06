import { useEffect, useState } from 'react'
import TrackPlayer, { Capability, RatingType } from 'react-native-track-player'

export const setupPlayer = async (queue = []) => {
	try {
		const isInitialized = await TrackPlayer.isServiceRunning();
		if (isInitialized) {
			return;
		}

		await TrackPlayer.setupPlayer({
			maxCacheSize: 1024 * 10,
		});

		await TrackPlayer.updateOptions({
			ratingType: RatingType.Heart,
			alwaysPauseOnInterruption: true,
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.Stop,
			],
			notificationCapabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.Stop,
			],
			compactCapabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
			],
		});

		await TrackPlayer.setVolume(0.3) // not too loud
		//await TrackPlayer.setRepeatMode(RepeatMode.Queue);

		if (__DEV__) {
			await test();
		}
		async function test() {
			const queue = await TrackPlayer.getQueue();
			if (queue.length > 0) {
				console.log("A fila: ", queue.length);
			} else {
				console.log("A fila está vazia");
			}
		}
		return true;
	} catch (error) { }
}

export const useSetupTrackPlayer = () => {
	const [teste, setTeste] = useState(false);

	useEffect(() => {
		if (teste) return

		setupPlayer()
			.then(() => {
				setTeste(true);
			})
			.catch((error) => {
				setTeste(false);
				console.error(error)
			})
	}, [teste])
}



/*
export const useSetupTrackPlayer = ({ onLoad }: { onLoad?: () => void }) => {
	const isInitialized = useRef(false)

	useEffect(() => {
		if (isInitialized.current) return

		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onLoad?.()
			})
			.catch((error) => {
				isInitialized.current = false
				console.error(error)
			})
	}, [onLoad])
}
*/