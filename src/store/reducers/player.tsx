import { player as playerState } from '../states';
<<<<<<< HEAD
import { DISPATCHES } from '../../constants';
=======
import { DISPATCHES } from '@/src/constants';
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee

const player = (state = playerState, { type = '' as string, payload = {} }: any) => {
	switch (type) {
		case DISPATCHES.SET_CURRENT_SONG:
			const config = {
				playback: 'current',
				soundObj: 'current',
				detail: 'current',
				playbackStatus: 'current',
				...payload,
			};
			if (payload?.songs) {
				state.songs = payload?.songs;
			}
			return {
				...state,
				currentSong: {
					// @ts-ignore
					playback: config?.playback === 'current' ? state?.currentSong?.playback : payload?.playback,
					// @ts-ignore
					soundObj: config?.soundObj === 'current' ? state?.currentSong?.soundObj : payload?.soundObj,
					// @ts-ignore
					detail: config?.detail === 'current' ? state?.currentSong?.detail : payload?.detail,
					// @ts-ignore
					playbackStatus: config?.playbackStatus === 'current' ? state?.currentSong?.playbackStatus : payload?.playbackStatus,
				},
			};

		default:
			return state;
	}
};

export default player;

