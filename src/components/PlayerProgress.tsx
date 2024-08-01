import { colors, fontSize } from '@/src/constants/tokens'
import { formatSecondsToMinutes } from '@/src/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/src/styles'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ViewProps } from 'react-native'
//import { Slider } from 'react-native-awesome-slider'
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { useState } from 'react';

interface PlayerProgressNumberProps extends ViewProps {
	left?: number;
	right?: number;
}

export const PlayerProgressBar = ({ style, left = -30, right = 65 }: PlayerProgressNumberProps) => {
	const { duration, position } = useProgress(250)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)
	const [isSliding, setIsSliding] = useState<boolean>(false)

	return (
		<View>
			<View style={styles.tracker}>
				<View>
					<Slider
						minimumValue={0}
						maximumValue={duration}
						minimumTrackTintColor="red"
						thumbTintColor="transparent"
						maximumTrackTintColor="transparent"
						value={position}
						onSlidingStart={() => (setIsSliding(true))}
						onValueChange={(value) => {
							TrackPlayer.seekTo(value)
						}}
						onSlidingComplete={(value) => {
							// if the user is not sliding, we should not update the position
							if (!isSliding) return
							setIsSliding(false)

							TrackPlayer.seekTo(value)
						}}
					/>
				</View>
			</View>
			<PlayerProgressNumber
				left={left}
				right={right}
			/>
		</View>
	);
}

export const PlayerProgressNumber = ({ style, left = -30, right = 65 }: PlayerProgressNumberProps) => {
	const { duration, position } = useProgress(250)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)

	return (
		<View style={styles.timeRow}>
			<Text style={[styles.timeText, { left }]}>
				{trackElapsedTime}
			</Text>
			<Text style={[styles.timeText, { right }]}>
				{trackRemainingTime || '00:00'}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		left: 50,
		marginTop: 5
	},
	timeText: {
		...defaultStyles.text,
		color: '#FFF', //color: colors.text,
		opacity: 0.75,
		//fontSize: fontSize.xs,
		letterSpacing: 0.7,
		backgroundColor: 'rgba(0, 0, 0, .2)', // 'gray', // '#FFF',
		fontSize: 13,
		fontWeight: 'bold',
	},
	container: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
		width: 200,
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
});
