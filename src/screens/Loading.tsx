import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import RNFS from 'react-native-fs';
import { DISPATCHES, SCREENS } from '@/src/constants';
import { Storage } from '@/src/helpers';

const { width, height } = Dimensions.get('screen');

const Loading = ({ songs, dispatch, navigation: { replace } }: any) => {
	const [mp3Files, setMp3Files] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);

	async function getAllSongs() {
		await getAllFiles();

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

			if (recents && recents.length > 0) {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						detail: songs[recents[0]],
						songs: mp3Files,
					},
				});
			}

			//await Ads.interstitialAds();
			resolve();
		});
	};

	const init = async () => {
		await getStorage();
		replace(SCREENS.HOME)
	};

	useEffect(() => {
		const getMyMp3 = async () => {
			if (!mp3Files.length) {
				const mp3IsStorage = await Storage.get('mp3Files', true);

				if (mp3IsStorage !== null) {
					setMp3Files(mp3IsStorage);
				} else {
					await getAllSongs();
					await Storage.store('mp3Files', mp3Files, true);
				}
				setLoading(false);
			}
		};
		getMyMp3();
	});

	useEffect(() => {
		if (mp3Files.length || !loading) {
			init();
		}
	}, [mp3Files.length, loading]);

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
