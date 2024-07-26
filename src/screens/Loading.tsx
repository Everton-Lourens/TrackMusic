import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import { DISPATCHES, SCREENS } from '@/src/constants';
import { Storage } from '@/src/helpers';
import { get, store } from '@/src/helpers/storage';

const { width, height } = Dimensions.get('screen');

const Loading = ({ songs, dispatch, navigation: { replace } }: any) => {
	const [mp3Files, setMp3Files] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	async function getAllSongs() {
		await getAllFiles();
		setMp3Files(mp3Files);
		return setLoading(false);

		async function getAllFiles() {
			try {
				const files: Array<any> = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);

				if (!files || !files?.length) return [];

				for (const file of files) {
					if (file.isFile() && file.name.endsWith('.mp3')) {
						const isObjectInArray = mp3Files.some(obj =>
							obj.path === file.path
						);
						if (isObjectInArray) return;
						else mp3Files.push(file);
					}
					else if (file.isDirectory()) {
						// Recurre em diretórios
						await getMp3Files(file?.path);
					}
				}
			} catch (error) {
				console.log(error);
			}
		}

		async function getMp3Files(directoryPath: any) {
			//directoryPath = '/storage/emulated/0/Music';
			try {
				const files: Array<any> = await RNFS.readDir(directoryPath);

				if (!files || !files?.length) return [];

				for (const file of files) {
					if (file.isFile() && file.name.endsWith('.mp3')) {
						const isObjectInArray = mp3Files.some(obj =>
							obj.path === file.path
						);
						if (isObjectInArray) return;
						else mp3Files.push(file);
					} else if (file.isDirectory()) {
						//console.log(JSON.stringify(file, null, 2));
						await getMp3Files(file.path);
					}
				}
			} catch (error) {
				console.error(error);
			}
		}
	}
	const getStorage = () => {
		return new Promise<void>(async (resolve) => {
			const favourites = await Storage.get('favourites', true);
			const recents = await Storage.get('recents', true);
			const playlists = await Storage.get('playlists', true);

			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					favourites,
					recents,
					playlists,
				},
			});

			//const allSongs = await getAllSongs();
			//songs = allSongs.length > 0 ? allSongs : songs;

			if (recents && recents.length > 0) {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						detail: songs[recents[0]],
						songs: songs,
					},
				});
			}

			//await Ads.interstitialAds();
			resolve();
		});
	};

	const init = async () => {
		///////////await getStorage();
		if (mp3Files.length || !loading) {
			replace(SCREENS.DETAILS)
		}
	};

	useEffect(() => {
		const getMyMp3 = async () => {
			if (!mp3Files.length) {
				const mp3IsStorage = await get('mp3Files', true);

				if (mp3IsStorage !== null) {
					setMp3Files(mp3IsStorage);
					setLoading(false);
				} else {
					await getAllSongs();
					await store('mp3Files', mp3Files, true);
				}
			}
			if (mp3Files.length || !loading) {
				replace(SCREENS.HOME)
			}
		};
		getMyMp3();
	}, [mp3Files.length, loading]);

	/*
	useEffect(() => {
		init();
	}, []);
	*/

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
