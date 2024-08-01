import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';

import { Header } from '../../widgets';
import { Audio } from '../../hooks';
import { DISPATCHES } from '@/src/constants';
import { millisToMin, Storage } from '../../helpers';
import { getAllSongs, getRandomImg } from '@/src/store/config';
import songDetail from '@/src/store/states/player';
import { PlayerProgressBar } from '@/src/components/PlayerProgress';
import { PlayerControls, RepeatButton, ShuffleButton } from '@/src/components/PlayerControls';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { PlayPauseButton, SkipToNextButton, SkipToPreviousButton, StopOutLineButton } from '@/src/components/PlayerControls';


//CONTINUE CODE HERE

const Index = ({ song, songs, dispatch, route: { params }, navigation: { goBack } }: any) => {
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');
	const [isFav, setIsFav] = useState(false);
	const { playing } = useIsPlaying(); // const playbackState = usePlaybackState();
	const stopBtnAnim = useRef(new Animated.Value(playing ? 1 : 0.3)).current;
	const onPlayPress = (song: any, index: any) => {
		// @ts-ignore
		navigate(SCREENS.PLAYING, {
			forcePlay: true,
			song,
			index,
		});
	};
	useEffect(() => {
		if (params?.index) {
			TrackPlayer.skip(params?.index);
		}
	})

	const verifyFav = async () => {
		const favs = await Storage.get('favourites', true);
		if (favs !== null) {
			const currentIndex = songs.findIndex((i: any) => i.id === song?.detail?.id);
			if (favs.includes(currentIndex)) {
				setIsFav(true);
			} else {
				setIsFav(false);
			}
		}

		dispatch({
			type: DISPATCHES.STORAGE,
			payload: {
				favourites: favs,
			},
		});
	};

	useEffect(() => {
		verifyFav();
	}, [song?.detail?.id]);


	const handleFav = async () => {
		const currentIndex = songs.findIndex((i: any) => i.id === song?.detail?.id);
		const favs = await Storage.get('favourites', true);

		if (favs === null) {
			await Storage.store('favourites', [currentIndex], true);
		} else {
			if (favs.includes(currentIndex)) {
				const updatedFavs = favs.filter((i: any) => i !== currentIndex);
				await Storage.store('favourites', updatedFavs, true);
			} else {
				favs.unshift(currentIndex);
				await Storage.store('favourites', favs, true);
			}
		}

		verifyFav();
	};

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor='black' />

			<ImageBackground style={styles.container} source={{ uri: song?.detail?.artwork || urlImg }} blurRadius={10} resizeMode="cover">
				<View style={[StyleSheet.absoluteFill, styles.overlay]} />
				<Header
					options={{
						left: {
							children: <Image style={styles.headerBtn} source={require('@/src/assets/icons/go-back.png')} />,
							onPress: goBack,
						},
						right: {
							children: <Image style={[styles.headerBtn, isFav ? {  } : { tintColor: 'gray' }]} source={require('@/src/assets/icons/fav.png')} />,
							onPress: handleFav,
						},
					}}
				/>

				{/*<View style={styles.frame}>
					<View>
						<Image style={styles.clipart} source={{ uri: song?.detail?.artwork }} resizeMode="cover" borderRadius={20} />
					</View>
					<View style={styles.details}>
						<View style={{ marginBottom: 25 }}>
							<Text style={styles.songTitle}>{song?.detail?.title}</Text>
							<Text style={styles.artistName}>{song?.detail?.artist}</Text>
						</View>
						<View style={styles.tracker}>
							<Slider
								minimumValue={0}
								maximumValue={song?.detail?.durationMillis}
								minimumTrackTintColor="#C07037"
								thumbTintColor="transparent"
								maximumTrackTintColor="transparent"
								value={song?.playbackStatus?.positionMillis || 0}
								onSlidingComplete={handleSeek}
							/>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
							<Text style={styles.minMin}>{millisToMin(song?.playbackStatus?.positionMillis || 0)}</Text>
							<Text style={styles.maxMin}>{millisToMin(song?.detail?.durationMillis)}</Text>
						</View>
					</View>
					<View style={styles.actionsContainer}>
						<TouchableOpacity onPress={handlePrev}>
							<Icon name="skip-back" color="#C4C4C4" />
						</TouchableOpacity>
						<View>
							<LinearGradient
								style={[styles.playAndPauseBtn, !song?.soundObj?.isPlaying && { paddingLeft: 4 }]}
								colors={['#939393', '#000']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							/>
							<PlayPauseButton />

						</View>

						<TouchableOpacity style={styles.btn} onPress={() => (song?.soundObj?.isPlaying ? handleStop(() => { }) : () => { })} disabled={actions?.stop}>
							<Animated.View style={{ opacity: stopBtnAnim }}>
								<Icon family="Ionicons" name="stop-outline" color="#C4C4C4" />
							</Animated.View>
						</TouchableOpacity>

						<TouchableOpacity onPress={handleNext}>
							<Icon name="skip-forward" color="#C4C4C4" />
						</TouchableOpacity>

						<TouchableOpacity onPress={configShuffle} style={styles.shuffleBtn}>
							<Icon
								name={"shuffle"}
								color={shuffle ? "#00e1ff" : "#C4C4C4"}
							/>
						</TouchableOpacity>
					</View>
				</View>*/}

				<View style={styles.frame}>
					<View>
						<Image style={styles.clipart} source={{ uri: song?.detail?.artwork }} resizeMode="cover" borderRadius={20} />
					</View>
					<View style={styles.details}>
						<View style={{ marginBottom: 25 }}>
							<Text style={styles.songTitle}>{song?.detail?.title}</Text>
							<Text style={styles.artistName}>{song?.detail?.artist}</Text>
						</View>
						<View>
							<PlayerProgressBar
								right={45}
								left={-35}
							/>
						</View>

					</View>
					<View style={styles.actionsContainer}>

						<RepeatButton
							iconSize={30}
							style={{ marginRight: -30 }}
						/>

						<View style={[styles.containerBtn]}>
							<View style={styles.row}>

								<SkipToPreviousButton
									iconSize={55}
								/>

								<PlayPauseButton
									iconSize={70}
								/>

								{/*<Animated.View style={{ opacity: stopBtnAnim }}>
									<StopOutLineButton iconSize={30} />
								</Animated.View>*/}

								<SkipToNextButton
									iconSize={55}
								/>

							</View>
						</View>

						<ShuffleButton
							iconSize={30}
							style={{ marginLeft: -30 }}
						/>

					</View>
				</View>

			</ImageBackground>
		</>
	);
	//const stopBtnAnim = useRef(new Animated.Value(song?.soundObj?.isPlaying ? 1 : 0.3)).current;
	const [newList, setNewList] = useState(null);
	const [newRecents] = useState<Array<any>>([]);
	const [shuffle, setShuffle] = useState<boolean>(false);
	const [actions, setActions] = useState({
		prev: false,
		play: false,
		stop: false,
		next: false,
	});
	const configShuffle = async () => {
		await Storage.store('shuffle', String(!shuffle), false);
		setShuffle(!shuffle);
	}

	const soundDetailRecovery = async () => {
		if (!song?.detail) {
			song.detail = await Storage.get('detail', true) || songDetail?.currentSong?.detail;
		}
	}

	const newListOfSongs_OLD = async () => {
		try {
			if (!newList) {
				const allSongs: any = await getAllSongs();
				songs = allSongs;
				setNewList(allSongs);
				setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false);
			}
			if (shuffle) {
				// @ts-ignore
				const listLength = newList.length;
				// Cria uma lista de IDs únicos
				const uniqueIDs = Array.from({ length: listLength }, (_, index) => index);
				// Embaralha a lista de IDs únicos
				uniqueIDs.sort(() => Math.random() - 0.5);
				// Atribui os IDs embaralhados aos itens da lista
				// @ts-ignore
				return songs = [...newList].map((song: any, index) => ({ ...song, id: uniqueIDs[index] })); // shueffled list
			}
			return songs = newList ? newList : songs; // original list
		} catch (error: any) {
			console.error(error);
		}
	}

	const newListOfSongs = async () => {
		/*
		try {
			setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false); 
			if (shuffle) {
				// @ts-ignore
				const listLength = songs.length;
				const uniqueIDs = Array.from({ length: listLength }, (_, index) => index);
				uniqueIDs.sort(() => Math.random() - 0.5);
				// @ts-ignore
				return songs = [...songs].map((song: any, index) => ({ ...song, id: uniqueIDs[index] })); // shueffled list
			}
			return songs = songs ? songs : songs; // original list
		} catch (error: any) {
			console.error(error);
		}
			*/
	}





	const _e = (arg = {}) => {
		setActions({
			...actions,
			...arg,
		});
	};

	const addToRecentlyPlayed = async (index: any) => {
		let filtered: any;
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
				recents: filtered,
			},
		});
	};

	const onPlaybackStatusUpdate = (playbackStatus: any) => {
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
		if (!song?.soundObj?.isLoaded) {
			return Audio.configAndPlay(
				song?.detail?.url, // URI FAIL
				shouldPlay
			)((playback, soundObj) => {
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						playback,
						soundObj,
					},
				});

				addToRecentlyPlayed(songs.findIndex((i: any) => i.id === song?.detail?.id));
			})(onPlaybackStatusUpdate as any);
		}
	};

	const handlePlayAndPause = async () => {
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
				addToRecentlyPlayed(prevIndex);
				_e({ prev: false });
			})(onPlaybackStatusUpdate as any);
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
				addToRecentlyPlayed(nextIndex);
				(async () => {
					setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false);
					await Storage.store('detail', (song?.detail || songDetail?.currentSong?.detail), true);
				})();
				_e({ next: false });
			})(onPlaybackStatusUpdate as any);
		});
	}

	const handleSeek = (millis: any) => {
		return Audio.seek(
			song?.playback,
			Math.floor(millis)
		)((soundObj) => {
			dispatch({
				type: DISPATCHES.SET_CURRENT_SONG,
				payload: {
					soundObj,
				},
			});
		})(onPlaybackStatusUpdate as any);
	};

	useEffect(() => {
		if (false) {
			if (song?.soundObj?.isPlaying) {
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
		}
	}, [song]);

	useEffect(() => {
		(async () => {
			setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false);
			await soundDetailRecovery();
			//await newListOfSongs();
			await Audio.init();
			configAndPlay();
		})();
	}, []);

	useEffect(() => {
		if (false) {
			verifyFav();
		}
	}, [song?.detail?.id]);

	useEffect(() => {
		if (false) {
			if (params?.forcePlay && params?.song?.uri !== song?.detail?.url) {

				handleStop(() => {
					Audio.play(
						song?.playback,
						params?.song?.uri
					)((soundObj) => {
						dispatch({
							type: DISPATCHES.SET_CURRENT_SONG,
							payload: {
								soundObj,
								detail: params?.song,
							},
						});

						addToRecentlyPlayed(params?.index);
					})(onPlaybackStatusUpdate as any);
				});
			}
		}
	}, [params?.forcePlay, params?.song, params?.index]);

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor='black' />

			<ImageBackground style={styles.container} source={{ uri: song?.detail?.artwork }} blurRadius={10} resizeMode="cover">
				<View style={[StyleSheet.absoluteFill, styles.overlay]} />
				<Header
					options={{
						left: {
							// @ts-ignore
							children: <Icon name="chevron-left" color="#FFF" />,
							onPress: goBack,
						},
						right: {
							// @ts-ignore
							children: <Icon name="heart" color={isFav ? '#C07037' : '#FFF'} />,
							onPress: handleFav,
						},
					}}
				/>
				<View style={styles.frame}>
					<View>
						<Image style={styles.clipart} source={{ uri: song?.detail?.artwork }} resizeMode="cover" borderRadius={20} />
					</View>
					<View style={styles.details}>
						<View style={{ marginBottom: 25 }}>
							<Text style={styles.songTitle}>{song?.detail?.title}</Text>
							<Text style={styles.artistName}>{song?.detail?.artist}</Text>
						</View>
						<View style={styles.tracker}>
							<Slider
								minimumValue={0}
								maximumValue={song?.detail?.durationMillis}
								minimumTrackTintColor="#C07037"
								thumbTintColor="transparent"
								maximumTrackTintColor="transparent"
								value={song?.playbackStatus?.positionMillis || 0}
								onSlidingComplete={handleSeek}
							/>
						</View>
						<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
							<Text style={styles.minMin}>{millisToMin(song?.playbackStatus?.positionMillis || 0)}</Text>
							<Text style={styles.maxMin}>{millisToMin(song?.detail?.durationMillis)}</Text>
						</View>
					</View>
					<View style={styles.actionsContainer}>
						<TouchableOpacity onPress={handlePrev}>
							{/*// @ts-ignore */}
							<Icon name="skip-back" color="#C4C4C4" />
						</TouchableOpacity>
						<View>
							<LinearGradient
								style={[styles.playAndPauseBtn, !song?.soundObj?.isPlaying && { paddingLeft: 4 }]}
								colors={['#939393', '#000']}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
							/>
							<PlayPauseButton />

						</View>

						<TouchableOpacity style={styles.btn} onPress={() => (song?.soundObj?.isPlaying ? handleStop(() => { }) : () => { })} disabled={actions?.stop}>
							<Animated.View style={{ opacity: stopBtnAnim }}>
								{/*// @ts-ignore */}
								<Icon family="Ionicons" name="stop-outline" color="#C4C4C4" />
							</Animated.View>
						</TouchableOpacity>

						<TouchableOpacity onPress={handleNext}>
							{/*// @ts-ignore */}
							<Icon name="skip-forward" color="#C4C4C4" />
						</TouchableOpacity>

						<TouchableOpacity onPress={configShuffle} style={styles.shuffleBtn}>
							{/*// @ts-ignore */}
							<Icon
								name={"shuffle"}
								color={shuffle ? "#00e1ff" : "#C4C4C4"}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ImageBackground>
		</>
	);
};

const mapStateToProps = (state: any) => ({ song: state?.player?.currentSong, songs: state?.player?.songs });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	headerBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		//alignItems: 'center',
		//paddingLeft: 4,
		borderRadius: 35,
		//borderWidth: 1.5,
		//marginHorizontal: 5,
		//marginVertical: 50, // position
	},
	shuffleBtn: {
		position: 'absolute',
		top: 19,
		left: 250,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		backgroundColor: 'rgba(0, 0, 0, .5)',
	},
	frame: {
		flex: 1,
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
	clipart: {
		width: 250,
		height: 250,
	},
	details: {
		width: '85%',
	},
	songTitle: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: 'bold',
		letterSpacing: 1,
	},
	artistName: {
		color: 'rgba(255, 255, 255, .6)',
	},
	tracker: {
		backgroundColor: 'rgba(255, 255, 255, .2)',
		borderRadius: 100,
	},
	minMin: {
		color: '#FFF',
	},
	maxMin: {
		color: '#FFF',
	},
	actionsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 400, // CORRIGIR
	},
	playAndPauseBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 1.5,
		borderColor: '#FFF',
	},
	btn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 60,
		height: 60,
		borderRadius: 100,
		borderWidth: 1.5,
		borderColor: '#FFF',
	},
	controlBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 4,
		borderRadius: 10,
		borderWidth: 1.5,
		marginHorizontal: 5,
	},
	containerBtn: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});

