import { storage as storageState } from '../states';
<<<<<<< HEAD
import { DISPATCHES } from '../../constants';
=======
import { DISPATCHES } from '@/src/constants';
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee

const storage = (state = storageState, { type, payload }: any) => {
	switch (type) {
		case DISPATCHES.STORAGE:
			const config = {
				favourites: 'current',
				recents: 'current',
				playlists: 'current',
				...payload,
			};

			return {
				...state,
				favourites: config?.favourites === 'current' ? state?.favourites : payload?.favourites,
				recents: config?.recents === 'current' ? state?.recents : payload?.recents,
				playlists: config?.playlists === 'current' ? state?.playlists : payload?.playlists,
			};

		default:
			return state;
	}
};

export default storage;
