import { colors, fontSize } from '@/src/constants/tokens'
import { formatSecondsToMinutes } from '@/src/helpers/miscellaneous'
import { defaultStyles, utilsStyles } from '@/src/styles'
import { StyleSheet, Text, View, ViewProps } from 'react-native'
import TrackPlayer, { useProgress } from 'react-native-track-player'
import { useState, useEffect } from 'react'

export const PlayerProgressBar = ({ style }: ViewProps) => {
	const { duration, position } = useProgress(250)

	const [isSliding, setIsSliding] = useState(false)
	const [progress, setProgress] = useState(0)

	const trackElapsedTime = formatSecondsToMinutes(position)
	const trackRemainingTime = formatSecondsToMinutes(duration - position)

	useEffect(() => {
		if (!isSliding) {
			setProgress(duration > 0 ? position / duration : 0)
		}
	}, [position, duration, isSliding])


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
})
