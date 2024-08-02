import React, { useEffect, useRef, useState, memo } from 'react';
import { Animated, Dimensions, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { connect } from 'react-redux';
import Slider from '@react-native-community/slider';
import Marquee from 'react-native-marquee';
//import Icon from '@/src/components/Icon';
import { DISPATCHES, SCREENS } from '@/src/constants';
//import { Audio } from '@/src/hooks';
import { Storage } from '@/src/helpers';
import { PlayPauseButton, SkipToNextButton, SkipToPreviousButton } from '@/src/components/PlayerControls';
import TrackPlayer, { useTrackPlayerEvents, Event, useIsPlaying, useProgress } from 'react-native-track-player';
import { PlayerProgressNumber } from '@/src/components/PlayerProgress';

//import { PlayerControls } from '@/src/components/PlayerControls';

const { width } = Dimensions.get('screen');

const Index = ({ song, dispatch }: any) => {
	const { playing } = useIsPlaying(); // const playbackState = usePlaybackState();
	const { navigate } = useNavigation();
	const stopBtnAnim = useRef(new Animated.Value(playing ? 1 : 0.3)).current;
	const { duration, position } = useProgress(250);

	// Evento para atualizar o estado quando a música em reprodução mudar
	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
			const track: any = await TrackPlayer.getTrack(event.nextTrack);
			addToRecentlyPlayed(track?.id - 1);
			dispatch({
				type: DISPATCHES.SET_CURRENT_SONG,
				payload: {
					detail: track,
				},
			});
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
	};

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
					left={60}
					right={50}
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
				{song?.detail?.artist ?
					<Text style={styles.songArtist} numberOfLines={1}>
						{song?.detail?.artist}
					</Text> : null}
			</View>

				<View style={[styles.actions, { position: 'absolute' }]}>
					<SkipToPreviousButton iconSize={45} />

					<PlayPauseButton iconSize={60} />

					<SkipToNextButton iconSize={45} />
				</View>

			<View style={{ justifyContent: 'center',  marginRight: 155, marginTop: 70 }}>
				<Marquee
					style={styles.songTitle}
					speed={0.10}
					marqueeOnStart={true}
					loop={true}
				>
					{song?.detail?.title}
				</Marquee>
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
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 5,
		marginLeft: 45,
	},
	btn: {
		padding: 5,
	},
});
