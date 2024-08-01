import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import { DISPATCHES, SCREENS } from '@/src/constants';
import { Storage } from '@/src/helpers';
import Sound from 'react-native-sound';
import { getRandomImg } from '@/src/store/config';
import { useLogTrackPlayerState } from '@/src/hooks/useLogTrackPlayerState'
import { setupPlayer } from '@/src/hooks/useSetupTrackPlayer'
import TrackPlayer from 'react-native-track-player';

const { width, height } = Dimensions.get('screen');

const Loading = ({ songs, dispatch, navigation: { replace } }: any) => {
	const [mp3Files, setMp3Files] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useLogTrackPlayerState();

	async function getAllSongs() {
		return new Promise<void>(async (resolve) => {
			await getAllFiles();
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
								const durationMillis = await getDurationMillis(file?.path)
								if (!durationMillis) return;
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
								const durationMillis = await getDurationMillis(file?.path)
								if (!durationMillis) return;
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

			async function getDurationMillis(file: string): Promise<number | false> {
				return new Promise<number | false>((resolve, reject) => {
					const sound = new Sound(file, Sound.MAIN_BUNDLE, (error) => {
						if (error) {
							console.error('Erro ao carregar o áudio', error, file);
							return resolve(false);
						}
						const duration = sound.getDuration();
						if (duration * 1000 < 5000) {
							return resolve(false);
						}
						resolve(duration * 1000);
					});
				}).catch((error) => {
					console.error('Erro ao obter a duração do áudio', error);
					return false;
				});
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
					await Storage.store('mp3Files', allSongs, true);
					setMp3Files(allSongs);
				}
				setLoading(false);
			}
		};
		getMyMp3();
	});

	const init = async () => {
		try {
			if (mp3Files?.length || !loading) {
				if (__DEV__ && false) {
					const music = await setupPlayer();
					const mp3IsStorage = await Storage.get('mp3Files', true);
					if (mp3IsStorage === null || !mp3IsStorage?.length) await Storage.store('mp3Files', music, true);
					setMp3Files(music as any); // local json music to test
				} else {
					await setupPlayer();
				}
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

	return <Image style={styles.img} source={require('@/src/assets/splash.png')} resizeMode="cover" />;
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
