import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useTrackPlayerEvents, Event, useIsPlaying } from 'react-native-track-player';
import { Storage } from '@/src/helpers';
import { useEffect, useState } from 'react';

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
		<View style={[{ height: iconSize }, style]}>
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
					<Image source={require('@/src/assets/icons/pause.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
				) : (
					<Image source={require('@/src/assets/icons/play.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
				)}

			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
				<Image source={require('@/src/assets/icons/next.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>

	)
}

export const SkipToPreviousButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
				<Image source={require('@/src/assets/icons/previous.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>
	)
}

export const ShuffleButton = ({ style }: any) => {
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

	const onPress = async () => {
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
		<TouchableOpacity style={style} onPress={async () => await onPress()}>
			{shuffle ?
				<Image style={{ width: 40, height: 40, backgroundColor: 'red' }} source={require('@/src/assets/icons/shuffled.png')} resizeMode="contain" /> :
				<Image style={{ width: 40, height: 40, backgroundColor: 'red' }} source={require('@/src/assets/icons/shuffle.png')} resizeMode="contain" />
			}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	controlBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingLeft: 4,
		borderRadius: 10,
		borderWidth: 1.5,
		marginHorizontal: 5,
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
