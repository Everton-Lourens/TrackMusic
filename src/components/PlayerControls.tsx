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
						console.log('@PLAY ');
						if (playing) {
							await TrackPlayer.pause();
						} else {
							const queue = await TrackPlayer.getQueue();
							if (queue.length > 0) {
								console.log("A fila: ", queue.length);
								await TrackPlayer.play();
							} else {
								console.log("A fila está vazia");
							}
						}
					} catch (error) {
						console.error("Erro ao controlar a reprodução:", error);
					}
				}}

			>
				<Image source={require('@/src/assets/icons/play2.png')} style={styles.playBtn} />
			</TouchableOpacity>
		</View>
	)
}

export const SkipToNextButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
			<Image source={require('@/src/assets/icons/play2.png')} style={styles.playBtn} />
		</TouchableOpacity>
	)
}

export const SkipToPreviousButton = ({ iconSize = 30 }: PlayerButtonProps) => {
	return (
		<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
			<Image source={require('@/src/assets/icons/play2.png')} style={styles.playBtn} />
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	playBtn: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 50,
		paddingLeft: 4,
		borderRadius: 100,
		borderWidth: 1.5,
		borderColor: '#006680',
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
