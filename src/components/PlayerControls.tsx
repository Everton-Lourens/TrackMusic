import { Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying } from 'react-native-track-player'

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
