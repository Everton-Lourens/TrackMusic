import { Image, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useIsPlaying, RepeatMode, State } from 'react-native-track-player';
import { Storage } from '../helpers';
import { useEffect, useState } from 'react';
import { getStorageTimeTrack } from './StorageTimeTrack';
import { Toast } from './Toast';
import { LoadingFirstMusic } from './LoadingFirstMusic';

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
	visible?: boolean
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
	const { playing } = useIsPlaying();

	return (
		<View style={[{ height: iconSize }, style]}>
			{/*<View style={[{ height: iconSize }, style]}>*/}
			<TouchableOpacity
				activeOpacity={0.85}
				onPress={async () => {
					try {
						const isPlaying: any = await TrackPlayer.getState();
						if (__DEV__) {
							console.log('::::::::::Start isPlaying::::::::::', isPlaying);
						}
						if (isPlaying === 'playing') {
							await TrackPlayer.pause();
							//await setStorageTimeTrack();
							console.log('@PAUSE')
						} else if (isPlaying === 'paused' || isPlaying === 'ready') {
							await getStorageTimeTrack();
							await TrackPlayer.play();
							const isPlayingEnd: any = await TrackPlayer.getState();
							if (isPlayingEnd !== 'playing') {
								await TrackPlayer.pause();
								await LoadingFirstMusic(true, null, 0);
								await TrackPlayer.play();
							}
							console.log('@PLAY')
						} else if (isPlaying === 'stopped' || isPlaying === 'ended' || isPlaying === 'none') {
							await LoadingFirstMusic();
							await TrackPlayer.play();
							console.log('@UNDEFINED:::', isPlaying);
						}

					} catch (error) {
						console.error("Erro ao controlar a reprodução:", error);
					}
				}}

			>
				{playing ? (
					<Image source={require('../assets/icons/pause.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
				) : (
					<Image source={require('../assets/icons/play.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
				)}
			</TouchableOpacity>

		</View >
	)
}

export const StopOutLineButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.stop()}>
				<Image source={require('../assets/icons/stop-outline.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>

	)
}

export const SkipToNextButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.7} onPress={async () => {
				await LoadingFirstMusic();
				await TrackPlayer.skipToNext();
			}}>
				<Image source={require('../assets/icons/next.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>

	)
}

export const SkipToPreviousButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.7}
				onPress={async () => {
					await LoadingFirstMusic();
					await TrackPlayer.skipToPrevious();
				}}>
				<Image source={require('../assets/icons/previous.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>

	)
}

export const ShuffleButton = ({ style, iconSize = 40, visible = true }: PlayerButtonProps) => {
	const [shuffle, setShuffle] = useState<any>(null);
	const [toastVisible, setToastVisible] = useState(false);
	const [messageToast, setMessageToast] = useState('');

	const showToast = (activated = false) => {
		setToastVisible(true);
		setTimeout(() => {
			setToastVisible(false)
			setMessageToast('');
		}, 3000); // duration + animation time
		const message = activated
			? `Modo aleatório ativado!`
			: 'Modo aleatório desativado!';
		setMessageToast(message);
	};
	const changeShuffle = async () => {
		const newShuffle = !shuffle;
		showToast(newShuffle);
		setShuffle(newShuffle);
		await Storage.store('shuffle', String(newShuffle), false);
		try {
			const positionCurrentTrack: number = await TrackPlayer.getPosition();
			const currentTrackNumber: any = await TrackPlayer.getCurrentTrack();
			const theCurrentTrackContinues: any = await TrackPlayer.getTrack(currentTrackNumber);
			await LoadingFirstMusic(true, theCurrentTrackContinues, positionCurrentTrack);
		} catch (error) {
			console.error("check-MusicList: Erro ao controlar a reprodução:", error);
		}
	}

	useEffect(() => {
		(async () => {
			if (shuffle === null) {
				const storageShuffle = await Storage.get('shuffle', false) == 'true' ? true : false
				setShuffle(!!storageShuffle);
			}
		})();
	}, [])


	return (
		visible ? (
			<>
				<View style={[{ height: iconSize }, style]}>
					<TouchableOpacity activeOpacity={0.7} onPress={changeShuffle}>
						{shuffle ?
							<Image source={require('../assets/icons/shuffled.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
							: <Image source={require('../assets/icons/shuffle.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
						}
					</TouchableOpacity>

				</View>
				<Toast
					style={{ bottom: -50 }}
					visible={toastVisible}
					message={messageToast}
					onHide={() => setToastVisible(false)}
					colorGray={true}
				/>
			</>
		) : null
	);
}


export const RepeatButton = ({ style, iconSize = 40, visible = true }: PlayerButtonProps) => {
	const [repeat, setRepeat] = useState<number>(999);
	const [toastVisible, setToastVisible] = useState(false);
	const [messageToast, setMessageToast] = useState('');

	const showToast = (activated = false) => {
		setToastVisible(true);
		setTimeout(() => {
			setToastVisible(false)
			setMessageToast('');
		}, 3000); // duration + animation time
		const message = activated
			? `Repetição ativada!`
			: 'Repetição desativada!';
		setMessageToast(message);
	};
	const changeRepeat = async () => {
		try {
			const newRepeat = setRepeatMode();
			setRepeat(newRepeat);
			await TrackPlayer.setRepeatMode(newRepeat);
			await Storage.store('repeat', String(newRepeat), false);
		} catch (error) {
			console.error("Repeat: Erro ao controlar a reprodução:", error);
		}
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

	function showMessageToast() {
		const mode = setRepeatMode();
		mode === RepeatMode?.Off ? showToast(false) : showToast(true);
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
						source={require('../assets/icons/dont-repeat.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn]}
					/>
				);

			case RepeatMode?.Queue:
				return (
					<Image
						source={require('../assets/icons/repeat.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn]}
					/>
				);

			case RepeatMode?.Track:
				return (
					<Image
						source={require('../assets/icons/repeated.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn]}
					/>
				);

			default:
				return (
					<Image
						source={require('../assets/icons/shuffle.png')}
						style={[{ height: iconSize, width: iconSize }, styles.controlBtn]}
					/>
				);
		}
	};

	return (
		visible ? (
			<>
				<View style={[{ height: iconSize }, style]}>
					<TouchableOpacity activeOpacity={0.7} onPress={() => { changeRepeat(); showMessageToast(); }}>
						{getIcon()}
					</TouchableOpacity>
				</View>
				<Toast
					style={{ bottom: -50 }}
					visible={toastVisible}
					message={messageToast}
					onHide={() => setToastVisible(false)}
					colorGray={true}
				/>
			</>
		) : null
	);
}


const styles = StyleSheet.create({
	controlBtn: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		justifyContent: 'center',
		//alignItems: 'center',
		//paddingLeft: 4,
		borderRadius: 40,
		//borderWidth: 1.5,
		//marginHorizontal: 5,
		//marginVertical: 50, // position
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
