import { useEffect, useRef, useState } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'
const songs = [
	{
		id: '1',
		url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986838/GitHub/Projects/Musicont/mock/audios/peaches_dzluia.mp3', // URL da música
		title: 'Song Title 1',
		artist: 'Matuê',
		artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/maquina_do_tempo_gc3j68.jpg' // URL da arte do álbum
	},
	{
		id: '2',
		url: 'https://audio.jukehost.co.uk/rZ9sshicVlki8Dnm95ps1eWhK95dYgKF',
		title: 'Song Title 2',
		artist: 'Xamã',
		artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623895066/GitHub/Projects/Musicont/mock/images/maquina_do_tempo_gc3j68.jpg'
	}
];

export const setupPlayer = async (musics: Array<any>) => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	});

	await TrackPlayer.updateOptions({
		ratingType: RatingType.Heart,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
		],
	})

	await TrackPlayer.setVolume(0.3) // not too loud
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
	const currentTracks = await TrackPlayer.getQueue();
	const currentTrackIds = currentTracks.map(track => track.id);
	const newTracks = musics.filter(mp3 => !currentTrackIds.includes(mp3.id));
	if (newTracks.length > 0) {
		// Adicione apenas as músicas novas
		await TrackPlayer.add(newTracks);
	}
	await test();
	async function test() {
		const queue = await TrackPlayer.getQueue();
		if (queue.length > 0) {
			console.log("A fila: ", queue.length);
		} else {
			console.log("A fila está vazia");
		}
	}
	return true
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