import { colors, fontSize } from '../constants/tokens'
import { formatSecondsToMinutes } from '../helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '../styles'
import { SafeAreaView, StatusBar, StyleSheet, Text, View, ViewProps } from 'react-native'
//import { Slider } from 'react-native-awesome-slider'
import Slider from '@react-native-community/slider';
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { useState } from 'react';
//import { useSharedValue } from 'react-native-reanimated'

export const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)
	const [isSliding, setIsSliding] = useState<boolean>(false)
	//const progress = useSharedValue(0)

	//if (!isSliding) {
	//progress.value = duration > 0 ? position / duration : 0
	//}

	const handleSeek = (newValue: number) => {

	};
	//const min = useSharedValue(0)
	//const max = useSharedValue(1)


	return (
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
					onValueChange={async (value) => {
						await TrackPlayer.seekTo(value)
					}}
					onSlidingComplete={async (value) => {
						// if the user is not sliding, we should not update the position
						if (!isSliding) return
						setIsSliding(false)

						await TrackPlayer.seekTo(value)
					}}
				/>
			</View>

			<View style={styles.tracker}>

			</View>
		</View>
	);

	return (
		<View style={styles.timeRow}>
			<Text style={[styles.timeText, { left: 53 }]}>
				{trackElapsedTime}
			</Text>
			<Text style={[styles.timeText, { right: 53 }]}>
				{trackRemainingTime}
			</Text>
		</View>
	);

	/*
	return (
		<View style={style}>


			<View style={styles.timeRow}>
				<Text style={styles.timeText}>{trackElapsedTime}</Text>

				<Text style={styles.timeText}>
					{' -'} {trackRemainingTime}
				</Text>
			</View>
		</View>
	)
	*/
}

const styles = StyleSheet.create({
	timeRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'baseline',
		left: 50
	},
	timeText: {
		...defaultStyles.text,
		color: colors.text,
		opacity: 0.75,
		//fontSize: fontSize.xs,
		letterSpacing: 0.7,
		fontWeight: '500',
		backgroundColor: 'rgba(0, 0, 0, .2)', // 'gray', // '#FFF',
		fontSize: 13,
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

function useSharedValue(arg0: number) {
	throw new Error('Function not implemented.');
}
