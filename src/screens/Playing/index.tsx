import React, { memo, useEffect, useRef, useState } from 'react';
import { Animated, Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
//import Slider from '@react-native-community/slider';
import Marquee from 'react-native-marquee';
import { Header } from '../../widgets';
import { DISPATCHES } from '../../constants';
import { millisToMin, Storage } from '../../helpers';
//import { getAllSongs, getRandomImg } from '../../store/config';
//import songDetail from '../../store/states/player';
import { PlayerProgressBar } from '../../components/PlayerProgress';
import { RepeatButton, ShuffleButton, } from '../../components/PlayerControls';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { PlayPauseButton, SkipToNextButton, SkipToPreviousButton } from '../../components/PlayerControls';
import * as Modal from '../../widgets/Modals';


//CONTINUE CODE HERE

const Index = ({ song, songs, dispatch, route: { params }, navigation: { goBack } }: any) => {
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');
	const [isFav, setIsFav] = useState(false);
	const { playing } = useIsPlaying(); // const playbackState = usePlaybackState();
	const stopBtnAnim = useRef(new Animated.Value(playing ? 1 : 0.3)).current;
	const [moreOptionsModal, setMoreOptionsModal] = useState(false);
	const [animation, setAnimation] = useState('');
	const [showTimeoutModal, setShowTimeoutModal] = useState(false);

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

	async function addToRecentlyPlayed(index: number) {
		try {
			if (!index) index = 0; // avoiding undefined
			let filtered: any;
			const recents = await Storage.get('recents', true);
			if (recents === null) {
				await Storage.store('recents', [index], true);
			} else {
				filtered = recents.filter((i: any) => i !== index).filter((i: any) => recents.indexOf(i) < 9);
				filtered.unshift(index);
				await Storage.store('recents', filtered, true);
			}
			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					recents: filtered,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		verifyFav();
	}, [song?.detail?.id]);

	useEffect(() => {
		if (isFav) {
			setAnimation('rubberBand');
			setTimeout(() => {
				setAnimation('tada');
			}, 1000);
		} else {
			setAnimation('rubberBand');
		}
	}, [isFav]);

	useEffect(() => {
		if (params?.forcePlay && params?.song?.uri !== song?.detail?.url && params?.song?.id !== song?.detail?.id) {
			TrackPlayer.pause().then(async () => {
				const currentTrack: number = await TrackPlayer.getCurrentTrack() || 0;
				await TrackPlayer.add(params?.song, currentTrack + 1);
				await TrackPlayer.skipToNext();
				await TrackPlayer.play();
				addToRecentlyPlayed(params?.song?.id);
			}).catch((e) => TrackPlayer.play());
		}
	}, [params?.forcePlay, params?.song, params?.index]);


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
							children: <Image style={[styles.headerBtn, { tintColor: 'gray', }]} source={require('../../assets/icons/go-back.png')} />,
							onPress: goBack,
						},
						right: {
							children: <Image style={[styles.headerBtn, { tintColor: 'gray', }]} source={require('../../assets/icons/option.png')} />,
							onPress: () => setMoreOptionsModal(true),
						},
					}}
				/>

				<View style={styles.frame}>
					<View style={{ top: 40 }}>
						<Image style={styles.clipart} source={{ uri: song?.detail?.artwork }} resizeMode="cover" borderRadius={20} />
					</View>
					<View style={styles.details}>
						<View style={{ marginBottom: 25 }}>

							<View style={{ alignSelf: 'flex-start', bottom: 40, position: 'absolute' }}>
								<TouchableOpacity onPress={() => { setShowTimeoutModal(true); setMoreOptionsModal(true); }} activeOpacity={0.4}>
									{/*<Text>{millisToMin(newTimeout.storageTime * 1000 || 0)}</Text>*/}
									<Image source={require('../../assets/icons/timeout-on.png')} />
								</TouchableOpacity>
							</View>

							<Animatable.View style={styles.headerBtn} animation={isFav ? animation : "swing"} easing="linear" iterationCount="infinite">
								<TouchableOpacity onPress={handleFav} activeOpacity={0.4}>
									{isFav ? <Image source={require('../../assets/icons/fav.png')} /> : <Image source={require('../../assets/icons/no-fav.png')} />}
								</TouchableOpacity>
							</Animatable.View>

							<Marquee
								style={styles.songTitle}
								speed={0.12}
								marqueeOnStart={true}
								loop={true}
							>
								{song?.detail?.title}
							</Marquee>
							{song?.detail?.artist ?
								<Text style={styles.artistName} numberOfLines={1}>
									{song?.detail?.artist}
								</Text> : null}
						</View>
						<PlayerProgressBar
							right={45}
							left={-35}
						/>

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
									iconSize={80}
									showMoreOptions={showTimeoutModal}
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

			</ImageBackground >

			<Modal.MoreOptions visible={moreOptionsModal}
				onClose={() => { setMoreOptionsModal(false); setShowTimeoutModal(false); }}
				title={song?.detail?.title}
				moreOptions={[
					{
						text: 'Iniciar',
						onPress: () => Alert.alert('Iniciar música'),
					},
					{
						text: 'Adicionar aos favoritos',
						onPress: () => Alert.alert('Adicionar música aos favoritos'),
					},
					{
						text: 'Adicionar à playlist',
						onPress: () => Alert.alert('Adicionar música à playlist'),
					},
					{
						text: 'Cronômetro: Desligar música',
						onPress: () => { setShowTimeoutModal(true); setMoreOptionsModal(true); },
					},
				]}
			/>
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
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignSelf: 'flex-end',
		//justifyContent: 'center',
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
		top: 90,
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
		width: 370, // Distância player
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

