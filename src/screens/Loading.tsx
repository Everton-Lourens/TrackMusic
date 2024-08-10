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
import { getAllSongs } from '../hooks/getStorageMp3';
import TrackPlayer from 'react-native-track-player';

const { width, height } = Dimensions.get('screen');

const Loading = ({ songs, dispatch, navigation: { replace } }: any) => {
	const [mp3Files, setMp3Files] = useState<Array<any>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	useLogTrackPlayerState();

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
				if (recents && recents?.length > 0) {
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
			} else {
				const defaultSong = {
					id: 1,
					title: 'Dance Monkey',
					artist: 'Tones and I',
					artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
					url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
				}
				await TrackPlayer.add(defaultSong);
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						detail: defaultSong,
						songs: defaultSong,
					},
				});
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
