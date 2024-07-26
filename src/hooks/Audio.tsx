// TODO: Make it better
import { Audio } from 'expo-av';

export const init = async (defaultConfigs = {}) => {
	try {
		const configs = {
			allowsRecordingIOS: false,
			// @ts-ignore
			//interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX, // ERROR  LOG  [Audio Error][init]: "interruptionModeIOS" was set to an invalid value.
			playsInSilentModeIOS: true,
			// @ts-ignore
			//interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX, // ERROR  [Audio Error][init]: "interruptionModeAndroid" was set to an invalid value.
			shouldDuckAndroid: true,
			staysActiveInBackground: true,
			playThroughEarpieceAndroid: false,
			...defaultConfigs,
		};

		await Audio.setAudioModeAsync(configs);
	} catch (error: any) {
		console.log(`[Audio Error][init]: ${error?.message}`);
	}
};

export const playbackStatusUpdate =
	(playbackObject: any) =>
		(next = (status: any) => console.log({ status })) => {
			if ('setOnPlaybackStatusUpdate' in playbackObject) {
				playbackObject.setOnPlaybackStatusUpdate(next);
			}
		};

export const play = (playbackObject: any, uri: any, shouldPlay = true) =>
	(next = (soundObj: any) => { }) =>
		(onPlaybackStatusUpdate = () => { }) => {
			(async () => {
				if (!uri)
					return;
				try {
					const soundObj = await playbackObject?.loadAsync({ uri }, { shouldPlay });
					playbackStatusUpdate(playbackObject)(onPlaybackStatusUpdate);
					next(soundObj);
				} catch (error: any) {
					console.log(`[Audio Error][play]: ${error?.message}`);
				}
			})();
		};



export const configAndPlay =
	(uri: any, shouldPlay = true) =>
		(next = (playbackObject: Audio.Sound, soundObj: any) => { }) =>
			(onPlaybackStatusUpdate = () => { }) => {
				(async () => {
					try {
						const playbackObject = new Audio.Sound();
						play(
							playbackObject,
							uri,
							shouldPlay
						)((soundObj) => {
							next(playbackObject, soundObj);
						})(onPlaybackStatusUpdate);
					} catch (error: any) {
						console.log(`[Audio Error][configAndPlay]: ${error?.message}`);
					}
				})();
			};

export const pause =
	(playbackObject: any) =>
		(next = (soundObj: any) => { }) => {
			(async () => {
				try {
					const soundObj = await playbackObject?.pauseAsync();
					next(soundObj);
				} catch (error: any) {
					console.log(`[Audio Error][pause]: ${error?.message}`);
				}
			})();
		};

export const resume =
	(playbackObject: any) =>
		(next: any = () => { }) => {
			(async () => {
				try {
					const soundObj = await playbackObject?.playAsync();
					next(soundObj);
				} catch (error: any) {
					console.log(`[Audio Error][resume]: ${error?.message}`);
				}
			})();
		};

export const seek =
	(playbackObject: any, millis: any) =>
		(next = (soundObj: any) => { }) =>
			(onPlaybackStatusUpdate = () => { }) => {
				(async () => {
					try {
						const soundObj = await playbackObject?.playFromPositionAsync(millis);
						playbackStatusUpdate(playbackObject)(onPlaybackStatusUpdate);
						next(soundObj);
					} catch (error: any) {
						console.log(`[Audio Error][seek]: ${error?.message}`);
					}
				})();
			};

export const stop =
	(playbackObject: any) =>
		(next: any = () => { }) => {
			(async () => {
				try {
					if ('stopAsync' in playbackObject && 'unloadAsync' in playbackObject) {
						const soundObj = await playbackObject?.stopAsync();
						await playbackObject?.unloadAsync();
						next(soundObj);
					} else {
						next(null);
					}
				} catch (error: any) {
					console.log(`[Audio Error][stop]: ${error?.message}`);
				}
			})();
		};
