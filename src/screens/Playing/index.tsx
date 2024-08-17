import React, { memo, useEffect, useRef, useState } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
//import Slider from '@react-native-community/slider';
import Marquee from 'react-native-marquee';
import { Header } from '../../widgets';
import { DISPATCHES } from '../../constants';
import { Storage } from '../../helpers';
//import { getAllSongs, getRandomImg } from '../../store/config';
//import songDetail from '../../store/states/player';
import { PlayerProgressBar } from '../../components/PlayerProgress';
import { loadingMusic, RepeatButton, ShuffleButton, } from '../../components/PlayerControls';
import TrackPlayer, { useIsPlaying } from 'react-native-track-player';
import { PlayPauseButton, SkipToNextButton, SkipToPreviousButton } from '../../components/PlayerControls';
import * as Modal from '../../widgets/Modals';
import TimeoutMusic from '../../components/TimeoutMusic';
import { Toast } from '../../components/Toast';
//CONTINUE CODE HERE

const Index = ({ song, songs, dispatch, route: { params }, navigation: { goBack } }: any) => {
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');
	const [isFav, setIsFav] = useState(false);
	//const { playing } = useIsPlaying(); // const playbackState = usePlaybackState();
	//const stopBtnAnim = useRef(new Animated.Value(playing ? 1 : 0.3)).current;
	const [moreOptionsModal, setMoreOptionsModal] = useState(false);
	const [animation, setAnimation] = useState('');
	const [iconTimeout, setIconTimeout] = useState(false);
	const [newTimeoutMusic] = useState(new TimeoutMusic());
	const [toastVisible, setToastVisible] = useState(false);
	const [messageToast, setMessageToast] = useState('');

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
			(async () => {
				await TrackPlayer.pause()
					.finally(async () => {
						await loadingMusic(true, params?.song);
						await TrackPlayer.play();
					});
			})();

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

	const initTimeoutMusic = (time: number = 30) => {
		setMoreOptionsModal(false);
		setIconTimeout(true);
		newTimeoutMusic.initTimeout(time);
		showToast(true, time);
	};

	const cancelTimeoutMusic = () => {
		setMoreOptionsModal(false);
		setIconTimeout(false);
		newTimeoutMusic.deleteTimeout();
		//showToast(false);
	};

	useEffect(() => {
		(async () => {
			const timeoutStorage: any = await newTimeoutMusic.getTimeout();
			if (timeoutStorage?.timeoutAtived === true) {
				setIconTimeout(true);
			} else {
				await cancelTimeoutMusic();
			}
		})();
	}, [])

	const showToast = (activated = false, time = 0) => {
		setToastVisible(true);
		setTimeout(() => {
			setToastVisible(false)
			setMessageToast('');
		}, 2300); // duration + animation time
		const message = activated
			? `Cronômetro Ativado${time === 0 ? '!' : ` ${time} minutos`}`
			: 'Cronômetro Desativado!';
		setMessageToast(message);
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
					<View style={{ top: '2%' }}>
						<Image style={styles.clipart} source={{ uri: song?.detail?.artwork }} resizeMode="cover" borderRadius={20} />
					</View>
					<View style={styles.details}>
						<View style={{ marginBottom: 25 }}>

							<View style={styles.timeoutBtn}>
								<TouchableOpacity onPress={() => { iconTimeout ? cancelTimeoutMusic() : setMoreOptionsModal(true) }} activeOpacity={0.4}>
									<Image source={iconTimeout ? require('../../assets/icons/timeout-on.png') : require('../../assets/icons/timeout-off.png')} />
								</TouchableOpacity>
							</View>

							<Animatable.View style={styles.favBtn} animation={isFav ? animation : "swing"} easing="linear" iterationCount="infinite">
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

						<PlayerProgressBar />

					</View>

					<View style={styles.actionsContainer}>

						<RepeatButton
							iconSize={35}
							style={{ marginRight: -30 }}
						/>

						<View style={[styles.containerBtn]}>
							<View style={styles.row}>

								<SkipToPreviousButton
									iconSize={55}
								/>

								<PlayPauseButton
									iconSize={75}
								/>

								{/*<Animated.View style={{ opacity: stopBtnAnim }}>
									<StopOutLineButton iconSize={35} />
								</Animated.View>*/}

								<SkipToNextButton
									iconSize={55}
								/>

							</View>
						</View>

						<ShuffleButton
							iconSize={35}
							style={{ marginLeft: -35 }}
						/>

					</View>
				</View>

			</ImageBackground >

			<Toast
				style={{ bottom: 50 }}
				visible={toastVisible}
				message={messageToast}
				onHide={() => setToastVisible(false)}
				colorGray={true}
			/>

			<Modal.MoreOptions visible={moreOptionsModal}
				onClose={() => { setMoreOptionsModal(false); }}
				title={'Cronômetro para música'}
				moreOptions={[
					{
						text: 'Desligar em 15 minutos',
						onPress: () => initTimeoutMusic(15),
					},
					{
						text: 'Desligar em 30 minutos',
						onPress: () => initTimeoutMusic(30),
					},
					{
						text: 'Desligar em 60 minutos',
						onPress: () => initTimeoutMusic(60),
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
		borderRadius: 35,
		bottom: '1%',
		left: '15%',
	},
	favBtn: {
		alignSelf: 'flex-end',
		borderRadius: 35,
		top: '0%',
	},
	timeoutBtn: {
		alignSelf: 'flex-start',
		bottom: '45%',
		position: 'absolute'
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
		top: '5%',
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
		bottom: '2%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		//width: 370, // Distância player
		width: '85%',
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
		right: 7
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
});
