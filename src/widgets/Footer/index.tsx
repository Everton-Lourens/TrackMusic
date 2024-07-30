import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';

//import Icon from '@/src/components/Icon';
import { DISPATCHES, SCREENS } from '@/src/constants';
//import { Audio } from '@/src/hooks';
import { Storage } from '@/src/helpers';
import { getAllSongs, setUriPicture } from '@/src/store/config';
import songDetail from '@/src/store/states/player';
import { PlayerControls, PlayPauseButton, SkipToNextButton, SkipToPreviousButton } from '@/src/components/PlayerControls';
import TrackPlayer, { useTrackPlayerEvents, Event, State, usePlaybackState, useIsPlaying, useProgress } from 'react-native-track-player';

//import { PlayerControls } from '@/src/components/PlayerControls';

const { width } = Dimensions.get('screen');

const Index = ({ song, songs, dispatch }: any) => {
	const { navigate } = useNavigation();
	const stopBtnAnim = useRef(new Animated.Value(song?.soundObj?.isPlaying ? 1 : 0.3)).current;
	const [newList, setNewList] = useState(null);
	const [shuffle, setShuffle] = useState(false);
	const [newRecents] = useState<Array<any>>([]);
	const { playing } = useIsPlaying(); // const playbackState = usePlaybackState();
	const [actions, setActions] = useState({
		prev: false,
		play: false,
		stop: false,
		next: false,
	});
	const [myTitle, setTMyTitle] = useState('');
	const [artist, setArtist] = useState('');
	const [image, setImage] = useState('https://res.cloudinary.com/jsxclan/image/upload/v1623987767/GitHub/Projects/Musicont/mock/images/peaches_sm4qvm.jpg');

	const { duration, position } = useProgress(250)

	// Evento para atualizar o estado quando a música em reprodução mudar
	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
			const track: any = await TrackPlayer.getTrack(event.nextTrack);
			setArtist(track?.artist);
			setImage(track?.artwork);
			setTMyTitle(track?.title);
		}
	});

	const handlePlayAndPause = async () => {
		if (playing) await TrackPlayer.pause();
		if (!playing) await TrackPlayer.play();
	}

	const soundDetailRecovery = async () => {
		if (!song?.detail) {
			song.detail = await Storage.get('detail', true) || songDetail?.currentSong?.detail;
		}
	}

	const _e = (arg = {}) => {
		setActions({
			...actions,
			...arg,
		});
	};

	const addToRecentlyPlayed = async (index: any) => {
		const recents = await Storage.get('recents', true);
		if (recents === null) {
			await Storage.store('recents', [index], true);
		} else {
			const filtered = recents.filter((i: any) => i !== index).filter((i: any) => recents.indexOf(i) < 9);
			filtered.unshift(index);
			await Storage.store('recents', filtered, true);
		}

		dispatch({
			type: DISPATCHES.STORAGE,
			payload: {
				recents: await Storage.get('recents', true),
			},
		});
	};

	const onPlaybackStatusUpdate: any = (playbackStatus: any) => {
		dispatch({
			type: DISPATCHES.SET_CURRENT_SONG,
			payload: {
				playbackStatus,
			},
		});

		if (playbackStatus?.didJustFinish) {
			handleNext();
		}
	};

	const configAndPlay = (shouldPlay = false) => {
		/*
		// ERROR INIT: Audio Error: "playbackObj" was set to an invalid value.
		if (!song?.soundObj?.isLoaded) {
			return Audio.configAndPlay(
				song?.detail?.uri,
				shouldPlay
			)((playback, soundObj) => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						playback,
						soundObj,
					},
				});
				setUriPicture(song?.detail?.img);
				addToRecentlyPlayed(songs.findIndex((i: any) => i.id === song?.detail?.id));
			})(onPlaybackStatusUpdate);
		}
			*/
	};

	const handlePlayAndPause_OLD = async () => {
		_e({ play: true });

		if (!song?.soundObj?.isLoaded) {
			configAndPlay(true);
			_e({ play: true });
		}

		if (song?.soundObj?.isLoaded && song?.soundObj?.isPlaying) {
			return Audio.pause(song?.playback)((soundObj) => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						soundObj,
					},
				});

				_e({ play: false });
			});
		}

		if (song?.soundObj?.isLoaded && !song?.soundObj?.isPlaying) {
			return Audio.resume(song?.playback)((soundObj: any) => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						soundObj,
					},
				});
				_e({ play: false });
			});
		}
	};

	const handleStop = async (after = () => { }) => {
		_e({ stop: true });
		await newListOfSongs();
		if (song?.soundObj?.isLoaded) {
			return Audio.stop(song?.playback)(() => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						soundObj: {},
					},
				});

				after();
				_e({ stop: false });
			});
		}

		after();
		_e({ stop: false });
	};

	const handlePrev = async () => {
		_e({ prev: true });
		if (!newRecents.length) {
			newRecents.push(...await Storage.get('recents', true));
		}
		newRecents.shift();// currently playing
		const currentIndex = songs.findIndex((i: any) => i.id === song?.detail?.id);
		//const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1; // OLD
		const prevIndex = currentIndex === 0 ? songs.length - 1 : (newRecents.length ? newRecents.shift() : currentIndex - 1);
		const prevSong = songs[prevIndex];

		return handleStop(() => {
			Audio.play(
				song?.playback,
				prevSong?.uri
			)((soundObj) => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						soundObj,
						detail: prevSong,
					},
				});
				(async () => {
					setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false);
				})();
				setUriPicture(prevSong?.img);
				addToRecentlyPlayed(prevIndex);
				_e({ prev: false });
			})(onPlaybackStatusUpdate);
		});
	};

	async function handleNext() {
		_e({ next: true });
		const currentIndex = songs.findIndex((i: any) => i.id === song?.detail?.id);
		const randomIndex = Math.floor(Math.random() * songs.length);
		const nextIndex = shuffle ? randomIndex : (currentIndex === songs.length - 1 ? 0 : currentIndex + 1);
		newRecents.unshift(nextIndex);
		const nextSong = songs[nextIndex];

		return handleStop(() => {
			Audio.play(
				song?.playback,
				nextSong?.uri
			)((soundObj) => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						soundObj,
						detail: nextSong,
					},
				});
				(async () => {
					setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false);
					await Storage.store('detail', (song?.detail || songDetail?.currentSong?.detail), true);
				})();
				setUriPicture(nextSong?.img);
				addToRecentlyPlayed(nextIndex);
				_e({ next: false });
			})(onPlaybackStatusUpdate);
		});
	}

	useEffect(() => {
		if (playing) {
			Animated.timing(stopBtnAnim, {
				toValue: 1,
				duration: 1000,
				useNativeDriver: true,
			}).start();
		} else {
			Animated.timing(stopBtnAnim, {
				toValue: 0.3,
				duration: 1000,
				useNativeDriver: true,
			}).start();
		}
	}, [song]);

	useEffect(() => {
		/*
		(async () => {
			setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false);
			await soundDetailRecovery();
			//await newListOfSongs();
			await Audio.init();
			configAndPlay();
		})();
		*/
	}, []);


	return (
		<View style={styles.container}>

			<View style={styles.tracker}>
				<View
					style={{
						...StyleSheet.absoluteFill as any,
						zIndex: 99,
					}}
				/>
				<Slider
					minimumValue={0}
					maximumValue={duration}
					minimumTrackTintColor="red"
					thumbTintColor="transparent"
					maximumTrackTintColor="transparent"
					value={position}
				/>
			</View>
			<View style={styles.left}>
				{/*// @ts-ignore*/}
				<TouchableWithoutFeedback onPress={() => navigate(SCREENS.PLAYING)}>
					<View style={styles.coverArtContainer}>
						<Image
							style={{
								width: 130,
								height: 130,
								position: 'absolute',
								right: -6,
								opacity: 0.5,
								alignSelf: 'center',
							}}
							source={{ uri: image }}
							resizeMode="cover"
							borderRadius={150}
							blurRadius={100}
						/>
						<Image style={styles.coverArt} source={{ uri: image }} resizeMode="cover" borderRadius={150} />
					</View>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.content}>
				<Text style={styles.songTitle} numberOfLines={artist ? 1 : 2}>
					{myTitle}
				</Text>
				{artist ?
					<Text style={styles.songArtist} numberOfLines={1}>
						{artist}
					</Text> : null}
			</View>
			<View style={styles.actions}>
				<SkipToPreviousButton iconSize={30} />

				<PlayPauseButton iconSize={30} />

				<SkipToNextButton iconSize={30} />
			</View>
		</View>
	);
};

const mapStateToProps = (state: any) => ({ song: state?.player?.currentSong, songs: state?.player?.songs });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0, 0, 0, .4)', // 'gray', // '#FFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width,
		height: 100,
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	tracker: {
		position: 'absolute',
		width,
		top: -11,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, .08)',
	},
	left: {
		flexBasis: 110,
	},
	coverArtContainer: {
		position: 'absolute',
		width: 135,
		height: 135,
		left: -30,
		bottom: -20,
	},
	coverArt: {
		width: 135,
		height: 135,
	},
	content: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: 5,
	},
	songTitle: {
		color: 'white', // '#555555',
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 0.7,
	},
	songArtist: {
		color: 'white', // '#555555',
	},
	actions: {
		flexBasis: 150,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 5,
	},
	btn: {
		padding: 5,
	},
});
