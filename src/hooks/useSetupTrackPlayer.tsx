import { useEffect, useRef, useState } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'

const exempleSongs = [
	{
		id: 1,
		url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
		title: 'Heartless',
		artist: 'The Weeknd',
		artwork: 'https://img.freepik.com/fotos-premium/foto-de-foco-de-fones-de-ouvido-em-fundo-desfocado-aconchegante-a-noite_980736-3020.jpg',
	},
	{
		id: 2,
		url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986838/GitHub/Projects/Musicont/mock/audios/peaches_dzluia.mp3',
		title: 'Peaches',
		artist: 'Justin Bieber',
		artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987767/GitHub/Projects/Musicont/mock/images/peaches_sm4qvm.jpg',
	},
	{
		id: 3,
		url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623988277/GitHub/Projects/Musicont/mock/audios/therefore-i-am_sea49g.mp3',
		title: 'Therefore I Am',
		artist: 'Billie Eilish',
		artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987985/GitHub/Projects/Musicont/mock/images/therefore-i-am_t9xxfs.jpg',
	},
	{
		id: 4,
		url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986820/GitHub/Projects/Musicont/mock/audios/kungs-vs-cookin_gbvmhs.mp3',
		title: 'This Girl',
		artist: "Kungs vs Cookin' on 3 Burners",
		artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/kungs-vs-cookin_yhuqv3.jpg',
	},
	{
		id: 5,
		url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
		title: 'Dance Monkey',
		artist: "Tones and I",
		artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
	},
];

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
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.Stop,
			],
		})

		await TrackPlayer.setVolume(0.3) // not too loud
		//await TrackPlayer.setRepeatMode(RepeatMode.Queue);
		if (queue.length > 0) {
			await TrackPlayer.reset();
			await TrackPlayer.add(queue);
			/*
			const currentTracks = await TrackPlayer.getQueue();
			const currentTrackIds = currentTracks.map(track => track.id);
			const newTracks = musics.filter(mp3 => !currentTrackIds.includes(mp3.id));
			if (newTracks.length > 0) {
				await TrackPlayer.add(newTracks);
			}
			*/
		}
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
		return exempleSongs //true
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