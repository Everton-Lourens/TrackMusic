import { Alert, Image, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import TrackPlayer, { useTrackPlayerEvents, Event, useIsPlaying, RepeatMode } from 'react-native-track-player';
import { Storage } from '../helpers';
import { useEffect, useState } from 'react';
import { Modal } from '../widgets';
import BackgroundService from 'react-native-background-actions';
import TimeoutTrack from './PauseMusic';

type PlayerControlsProps = {
	style?: ViewStyle
}

type PlayerButtonProps = {
	style?: ViewStyle
	iconSize?: number
	visible?: boolean
	showMoreOptions?: boolean
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


export const PlayPauseButton = ({ style, iconSize = 48, showMoreOptions = false }: PlayerButtonProps) => {
	const { playing } = useIsPlaying();
	const [moreOptionsModal, setMoreOptionsModal] = useState(false);
	const [newTimeout] = useState(new TimeoutTrack());
	const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(true), time));

	const veryIntensiveTask = async (taskDataArguments: any) => {
		const { time } = taskDataArguments;
		await newTimeout.startTimeout(time);

		for (let i = 0; BackgroundService.isRunning(); i++) {
			await sleep(1000); // await	a second
		}
	};

	const clickTimeoutStart = async (time: number = 30) => {
		const options = {
			taskName: 'Cronômetro',
			taskTitle: 'Cronômetro em execução',
			taskDesc: `Parando reprodutor de música em ${time} minutos.`,
			taskIcon: {
				name: 'ic_launcher',
				type: 'mipmap',
			},
			color: '#c36334',
			linkingURI: 'TrackMusic://myHost/path',
			parameters: {
				delay: 1000,
			},
		};
		
		await BackgroundService.start(veryIntensiveTask, options);
		Alert.alert('Cronômetro', `Cronômetro iniciado em ${time} minutos.`);
	};

	const clickTimeoutCancel = async () => {
		await BackgroundService.stop();
		newTimeout.stopTimeout();
	};

	useEffect(() => {
		setMoreOptionsModal(showMoreOptions);
	}, [showMoreOptions])

	return (
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
					<Image source={require('../assets/icons/pause.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
				) : (
					<Image source={require('../assets/icons/play.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
				)}
			</TouchableOpacity>

			<Modal.MoreOptions visible={moreOptionsModal}
				onClose={setMoreOptionsModal}
				title={'Parar músicas com cronômetro'}
				moreOptions={[
					{
						text: 'Iniciar cronômetro: 15 minutos',
						onPress: () => clickTimeoutStart(15),
					},
					{
						text: 'Iniciar cronômetro: 30 minutos',
						onPress: () => clickTimeoutStart(30),
					},
					{
						text: 'Iniciar cronômetro: 60 minutos',
						onPress: () => clickTimeoutStart(60),
					},
					{
						text: 'CANCELAR CRONÔMETRO',
						onPress: () => clickTimeoutCancel(),
					},
				]}
			/>
		</View>
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
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToNext()}>
				<Image source={require('../assets/icons/next.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>

	)
}

export const SkipToPreviousButton = ({ style, iconSize = 40 }: PlayerButtonProps) => {
	return (
		<View style={[{ height: iconSize }, style]}>
			<TouchableOpacity activeOpacity={0.7} onPress={() => TrackPlayer.skipToPrevious()}>
				<Image source={require('../assets/icons/previous.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
			</TouchableOpacity>
		</View>

	)
}

export const ShuffleButton = ({ style, iconSize = 40, visible = true }: PlayerButtonProps) => {
	const [configQueue, setConfigQueue] = useState<boolean>(false);
	const [shuffle, setShuffle] = useState<any>(null);

	const checkMusicList = async () => {
		if (configQueue === true) { // It only starts if the user clicks and not when rendering
			try {
				TrackPlayer.pause().then(async () => {
					const thisWillBeNext: any = await TrackPlayer.getCurrentTrack();
					const nextTrack: any = await TrackPlayer.getTrack(thisWillBeNext);
					const mp3Files: any = await Storage.get('mp3Files', true);
					if (shuffle) {
						mp3Files.sort(() => Math.random() - 0.5);
					}
					mp3Files.unshift(nextTrack);
					await TrackPlayer.setQueue(mp3Files);
					await TrackPlayer.play();
					setConfigQueue(false);  // null to not shuffle or organize
				}).catch(async (e) => await TrackPlayer.play());
			} catch (error) {
				console.error("check-MusicList: Erro ao controlar a reprodução:", error);
			}
		}
	}

	const changeShuffle = async () => {
		const newShuffle = !shuffle;
		setShuffle(newShuffle);
		setConfigQueue(true);
		await Storage.store('shuffle', String(newShuffle), false);
	}


	useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
		if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
			try {
				await checkMusicList();
			} catch (error) {
				console.error("Shuffle: Erro ao controlar a reprodução:", error);
			}
		}
	});

	useEffect(() => {
		(async () => {
			if (shuffle === null) {
				const storageShuffle = await Storage.get('shuffle', false) == 'true' ? true : false
				setShuffle(!!storageShuffle);
				if (storageShuffle) setConfigQueue(true);
			}
		})();
	}, [])


	return (
		visible ? (
			<View style={[{ height: iconSize }, style]}>
				{/*<TouchableOpacity style={style} onPress={async () => await changeShuffle()}>*/}
				<TouchableOpacity activeOpacity={0.7} onPress={async () => await changeShuffle()}>
					{shuffle ?
						<Image source={require('../assets/icons/shuffled.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
						: <Image source={require('../assets/icons/shuffle.png')} style={[{ height: iconSize, width: iconSize }, styles.controlBtn]} />
					}
				</TouchableOpacity>

			</View>) : null
	);
}


export const RepeatButton = ({ style, iconSize = 40, visible = true }: PlayerButtonProps) => {
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
			<View style={[{ height: iconSize }, style]}>
				{/*<TouchableOpacity style={style} onPress={async () => await changeShuffle()}>*/}
				<TouchableOpacity activeOpacity={0.7} onPress={async () => await changeRepeat()}>
					{getIcon()}

				</TouchableOpacity>
			</View>) : null
	);
}


const styles = StyleSheet.create({
	controlBtn: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
