import React, { useEffect, useRef, memo, useState } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import Marquee from "react-native-marquee";
//import Icon from '@/src/components/Icon';
import { DISPATCHES, SCREENS } from '../../constants';
//import { Audio } from '@/src/hooks';
import { Storage } from '../../helpers';
import { PlayPauseButton, RepeatButton, ShuffleButton, SkipToNextButton, SkipToPreviousButton } from '../../components/PlayerControls';
import TrackPlayer, { useTrackPlayerEvents, Event, useIsPlaying, useProgress } from 'react-native-track-player';
import { PlayerProgressNumber } from '../../components/PlayerProgress';
import TimeoutMusic from '../../components/TimeoutMusic';

//import { PlayerControls } from '@/src/components/PlayerControls';

const { width } = Dimensions.get('screen');

const Index = ({ song, dispatch }: any) => {
	const { playing } = useIsPlaying(); // const playbackState = usePlaybackState();
	const { navigate } = useNavigation();
	const stopBtnAnim = useRef(new Animated.Value(playing ? 1 : 0.3)).current;
	const { duration, position } = useProgress(250);
	const [newTimeoutMusic] = useState(new TimeoutMusic());

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {

			const timeout = await newTimeoutMusic.checkTimeoutMusic();

			if (timeout === false) {
				const track: any = await TrackPlayer.getTrack(event.nextTrack);
				addToRecentlyPlayed(track?.id - 1);
				dispatch({
					type: DISPATCHES.SET_CURRENT_SONG,
					payload: {
						detail: track,
					},
				});
			}
		}
	});

	/*
NOT WORKING
	useEffect(() => {
		async function teste() {
			if (!playing) {
				const randomIndex = Math.floor(Math.random() * songs.length);
				await TrackPlayer.skip(randomIndex);
				console.log('@@@@@@@@@@ shuffle @@@@@@@@@@');
				console.log(playing);
			}
		}
		teste();
	}, [playing])
	*/


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

				<PlayerProgressNumber
					left={34}
					right={87}
					fontSize={10}
					style={{ marginTop: -7 }}
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
							source={{ uri: song?.detail?.artwork }}
							resizeMode="cover"
							borderRadius={150}
							blurRadius={100}
						/>
						<Image style={styles.coverArt} source={{ uri: song?.detail?.artwork }} resizeMode="cover" borderRadius={150} />
					</View>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.content}>
				<Marquee
					style={styles.songTitle}
					speed={0.08}
					marqueeOnStart={true}
					delay={0}
					loop={true}
				>
					{song?.detail?.title + '                                               ' + song?.detail?.title + '                                               ' + song?.detail?.title + '                                               ' + song?.detail?.title}
				</Marquee>

				{song?.detail?.artist ?
					<Text style={styles.songArtist} numberOfLines={1}>
						{song?.detail?.artist}
					</Text> : null}
			</View>

			<View style={{ flexDirection: 'column', }}>

				<View style={styles.actions}>

					<RepeatButton visible={false} />

					<SkipToPreviousButton iconSize={50} />

					<PlayPauseButton iconSize={70} />

					<SkipToNextButton iconSize={50} />

					<ShuffleButton visible={false} />

				</View>
			</View>
		</View>

	);
};

const mapStateToProps = (state: any) => ({ song: state?.player?.currentSong });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'rgba(0, 0, 0, .4)', // 'gray', // '#FFF',
		flexDirection: 'row',
		justifyContent: 'space-between',
		//width,
		width,
		height: '12%',
		borderBottomLeftRadius: 15,
		borderBottomRightRadius: 15,
	},
	tracker: {
		position: 'absolute',
		width: '122%',
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
		marginLeft: -15,
		marginRight: '-57%',
		bottom: '7%',
	},
	songTitle: {
		color: 'white', // '#555555',
		fontSize: 15,
		//top: 5,
		fontWeight: 'bold',
		letterSpacing: 0.7,
	},
	songArtist: {
		color: 'white', // '#555555',
	},
	actions: {
		flexBasis: 150,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 5,
		marginRight: '20%', // Centraliza horizontalmente
		transform: [{ translateX: -75 }], // Ajusta a posição para o centro exato
		bottom: '3%',
	  },
	  
	btn: {
		padding: 5,
	},
});
