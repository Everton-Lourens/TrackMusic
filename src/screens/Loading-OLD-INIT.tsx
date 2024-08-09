import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import { DISPATCHES, SCREENS } from '../constants';
import { Storage } from '../helpers';
//import Sound from 'react-native-sound';
import { getRandomImg } from '../store/config';
import { useLogTrackPlayerState } from '../hooks/useLogTrackPlayerState'
import { setupPlayer } from '../hooks/useSetupTrackPlayer'
import TrackPlayer from 'react-native-track-player';

const { width, height } = Dimensions.get('screen');

const Loading = ({ songs, dispatch, navigation: { replace } }: any) => {
	const [mp3Files, setMp3Files] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useLogTrackPlayerState();

	async function getAllSongs() {
		return new Promise<void>(async (resolve) => {
			await getAllFiles();
			if (__DEV__ && !mp3Files?.length) {
				setMp3Files([
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
				]);
			}
			resolve(mp3Files as any);
			async function getAllFiles() {
				try {
					const files: Array<any> = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);

					if (!files || !files?.length) return;

					for (const file of files) {
						if (file?.isFile() && file?.name.endsWith('.mp3')) {
							const alreadyContains = mp3Files.some(obj =>
								obj.path === file?.path
							);
							if (alreadyContains) return;
							else {
								//const durationMillis = await getDurationMillis(file?.path)
								//if (!durationMillis) return;
								const img = getRandomImg()
								mp3Files.push({
									id: mp3Files?.length + 1,
									url: file?.path,
									title: file?.name.replace(/\.[^/.]+$/, '') || 'Sem Título',
									artwork: img,
								})
							}
						}
						else if (file?.isDirectory()) {
							// Recurre em diretórios
							await getMp3Files(file?.path);
						}
					}
				} catch (error) { }
			}

			async function getMp3Files(directoryPath: any) {
				//directoryPath = '/storage/emulated/0/Music';
				try {
					const files: Array<any> = await RNFS.readDir(directoryPath);

					if (!files || !files?.length) return;

					for (const file of files) {
						if (file?.isFile() && file?.name.endsWith('.mp3')) {
							const alreadyContains = mp3Files.some(obj =>
								obj.path === file?.path
							);
							if (alreadyContains) return;

							else {
								//const durationMillis = await getDurationMillis(file?.path)
								//if (!durationMillis) return;
								const img = getRandomImg()
								mp3Files.push({
									id: mp3Files?.length + 1,
									url: file?.path,
									title: file?.name.replace(/\.[^/.]+$/, '') || 'Sem Título',
									artist: '',
									artwork: img,
								})
							}
						} else if (file?.isDirectory()) {
							await getMp3Files(file?.path);
						}
					}
				} catch (error) { }
			}
		})
	}
	const getStorage = async () => {
		return new Promise<void>(async (resolve) => {
			const favourites = await Storage.get('favourites', true);
			const recents = await Storage.get('recents', true);
			const playlists = await Storage.get('playlists', true);
			await TrackPlayer.reset();

			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					favourites,
					recents,
					playlists,
				},
			});

			if (mp3Files?.length > 0) {
				await TrackPlayer.add(mp3Files);
				if (recents && recents?.length > 0) {
					TrackPlayer.skip(recents[0]); // skip to recent

					dispatch({
						type: DISPATCHES.SET_CURRENT_SONG,
						payload: {
							detail: mp3Files[recents[0]],
							songs: mp3Files,
						},
					});
				} else {
					dispatch({
						type: DISPATCHES.SET_CURRENT_SONG,
						payload: {
							detail: mp3Files[0],
							songs: mp3Files,
						},
					});
				}
			}
			//await Ads.interstitialAds();
			resolve();
		});
	};

	useEffect(() => {
		const getMyMp3 = async () => {
			if (!mp3Files?.length && loading === true) {
				const mp3IsStorage = await Storage.get('mp3Files', true);
				// @@@@@@@@@ COLOCAR ALGO PARA ATUALIZAR A LISTA MANUALMENTE
				if (mp3IsStorage !== null && mp3IsStorage?.length > 0) {
					setMp3Files(mp3IsStorage);
				} else {
					console.log('mp3 NO storage');
					const allSongs: any = await getAllSongs();
					if (allSongs?.length > 0) {
						setMp3Files(allSongs);
						await Storage.store('mp3Files', allSongs, true);
					}
				}
				setLoading(false);
			}
		};
		getMyMp3();
	});

	const init = async () => {
		try {
			if (mp3Files?.length || !loading) {
				await setupPlayer();
				await getStorage();
				replace(SCREENS.HOME);
			}
		} catch (error: any) {
			console.error('init::::', error);
			//replace(SCREENS.HOME) // >>>>>>> replace(SCREENS?.ERROR)
		}
	};

	useEffect(() => {
		init();
	}, [mp3Files?.length, loading]);

	return <Image style={styles.img} source={require('../assets/splash.png')} resizeMode="cover" />;
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Loading);

const styles = StyleSheet.create({
	img: {
		width,
		height,
	},
});