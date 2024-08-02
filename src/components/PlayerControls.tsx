import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useTrackPlayerEvents, Event, useIsPlaying, RepeatMode } from 'react-native-track-player';
import { Storage } from '@/src/helpers';
import { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
}

export const PlayerControls = ({ style }: PlayerControlsProps) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.row}>
				<SkipToPreviousButton />

				<PlayPauseButton />

				<SkipToNextButton />
			</View>
		</View>
	)
}

export const PlayPauseButton = ({ style, iconSize = 48 }: PlayerButtonProps) => {
	const { playing } = useIsPlaying()

	return (
		<LinearGradient
			style={styles.playBtn}
			colors={['#b8b8b8', 'rgba(0, 0, 0, 0)']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 0.7 }}
		>

			<View style={[{ height: iconSize }, style]}>
				{/*
				<View style={[{ height: iconSize }, style]}>*/}
				<TouchableOpacity
					activeOpacity={0.85}
					onPress={async () => {
						try {
							if (playing) await TrackPlayer.pause();
							else await TrackPlayer.play();

							if (__DEV__) {
								if (playing) console.log('@PAUSE ');
								else console.log('@PLAY ');
							}
						} catch (error) {
							console.error("Erro ao controlar a reprodução:", error);
						}
					}}

				>
					{playing ? (
						<Image source={require('@/src/assets/icons/pause.png')} style={[{ height: iconSize, width: iconSize }]} />
					) : (

						<Image source={require('@/src/assets/icons/play.png')} style={[{ height: iconSize, width: iconSize }]} />

					)}

				</TouchableOpacity>
			</View>
		</LinearGradient>
	)
}

export const StopOutLineButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<LinearGradient
			style={styles.playBtn}
			colors={['#b8b8b8', 'rgba(0, 0, 0, 0)']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 0.7 }}
		>
			<View style={[{ height: iconSize }, style]}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.stop()}>
					<Image source={require('@/src/assets/icons/stop-outline.png')} style={[{ height: iconSize, width: iconSize }]} />
				</TouchableOpacity>
			</View>
		</LinearGradient>
	)
}

export const SkipToNextButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<LinearGradient
			style={styles.playBtn}
			colors={['#b8b8b8', 'rgba(0, 0, 0, 0)']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 0.7 }}
		>
			<View style={[{ height: iconSize }, style]}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
					<Image source={require('@/src/assets/icons/next.png')} style={[{ height: iconSize, width: iconSize }]} />
				</TouchableOpacity>
			</View>
		</LinearGradient>
	)
}

export const SkipToPreviousButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<LinearGradient
			style={styles.playBtn}
			colors={['#b8b8b8', 'rgba(0, 0, 0, 0)']}
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 0.7 }}
		>
			<View style={[{ height: iconSize }, style]}>
				<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
					<Image source={require('@/src/assets/icons/previous.png')} style={[{ height: iconSize, width: iconSize }]} />
				</TouchableOpacity>
			</View>
		</LinearGradient>
	)
}

export const ShuffleButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	const [oldShuffle, setOldShuffle] = useState<any>(null);
	const [shuffle, setShuffle] = useState<any>(null);

	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
			try {
				if (shuffle !== null && shuffle !== oldShuffle) {
					const currenTrack: any = await TrackPlayer.getTrack(event.nextTrack);
					(async () => {
						const mp3Files: any = await Storage.get('mp3Files', true);
						if (shuffle) {
							mp3Files.sort(() => Math.random() - 0.5);
						}
						mp3Files.unshift(currenTrack);
						await TrackPlayer.setQueue(mp3Files);
					})();
					setOldShuffle(shuffle);
				}
			} catch (error) {
				console.error("Shuffle: Erro ao controlar a reprodução:", error);
			}
		}
	});

	const changeShuffle = async () => {
		setOldShuffle(shuffle)
		const newShuffle = !shuffle;
		setShuffle(newShuffle);
		await Storage.store('shuffle', String(newShuffle), false);
	}

	useEffect(() => {
		if (shuffle === null) {
			(async () => {
				const storageShuffle = await Storage.get('shuffle', false) == 'true' ? true : false
				setShuffle(storageShuffle);
				setOldShuffle(storageShuffle);
			})();
		}
	}, [shuffle])

	return (

		<View style={[{ height: iconSize }, style]}>
			{/*<TouchableOpacity style={style} onPress={async () => await changeShuffle()}>*/}
			<TouchableOpacity activeOpacity={0.7} onPress={async () => await changeShuffle()}>
				<LinearGradient
					style={styles.playBtn}
					colors={['#b8b8b8', 'rgba(0, 0, 0, 0)']}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 0.7 }}
				>
					{shuffle ?
						<Image source={require('@/src/assets/icons/shuffled.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn, { backgroundColor: 'rgba(255, 255, 255, 0.0)', }]} />
						: <Image source={require('@/src/assets/icons/shuffle.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn, { backgroundColor: 'rgba(255, 255, 255, 0.0)', }]} />
					}
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
}


export const RepeatButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	const [repeat, setRepeat] = useState<number>(999);
	const changeRepeat = async () => {
		try {
			const newRepeat = setRepeatMode();
			setRepeat(newRepeat);
			await TrackPlayer.setRepeatMode(newRepeat);
			await Storage.store('repeat', String(newRepeat), false);
		} catch (error) {
			console.error("Repeat: Erro ao controlar a reprodução:", error);
		}
		function setRepeatMode() {
			switch (repeat) {
				case RepeatMode?.Off:
					return RepeatMode?.Queue || 2;

				case RepeatMode?.Queue:
					return RepeatMode?.Track || 1;

				case RepeatMode?.Track:
					return RepeatMode?.Off || 0;

				default:
					return RepeatMode?.Off || 0;
			}
		}
	}

	useEffect(() => {
		if (repeat === 999) {
			(async () => {
				const previousRepeatMode: number = Number(await Storage.get('repeat', false) || 0);
				setRepeat(previousRepeatMode);
				await changeRepeat();
			})();
		}
	}, [])

	const getIcon = () => {
		switch (repeat) {
			case RepeatMode?.Off:
				return (
					<Image
						source={require('@/src/assets/icons/dont-repeat.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn, { backgroundColor: 'rgba(255, 255, 255, 0.0)' }]}
					/>
				);

			case RepeatMode?.Queue:
				return (
					<Image
						source={require('@/src/assets/icons/repeat.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn, { backgroundColor: 'rgba(255, 255, 255, 0.0)' }]}
					/>
				);

			case RepeatMode?.Track:
				return (
					<Image
						source={require('@/src/assets/icons/repeated.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn, { backgroundColor: 'rgba(255, 255, 255, 0.0)' }]}
					/>
				);

			default:
				return (
					<Image
						source={require('@/src/assets/icons/shuffle.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn, { backgroundColor: 'rgba(255, 255, 255, 0.0)' }]}
					/>
				);
		}
	};

	return (

		<View style={[{ height: iconSize }, style]}>
			{/*<TouchableOpacity style={style} onPress={async () => await changeShuffle()}>*/}
			<TouchableOpacity activeOpacity={0.7} onPress={async () => await changeRepeat()}>
				<LinearGradient
					style={styles.playBtn}
					colors={['#b8b8b8', 'rgba(0, 0, 0, 0)']}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 0.7 }}
				>
					{getIcon()}
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
}


const styles = StyleSheet.create({
	controlBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		//alignItems: 'center',
		//paddingLeft: 4,
		borderRadius: 35,
		//borderWidth: 1.5,
		//marginHorizontal: 5,
		//marginVertical: 50, // position
	},
	playBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		borderRadius: 35,
	},
	container: {
		width: '100%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
	},
})
