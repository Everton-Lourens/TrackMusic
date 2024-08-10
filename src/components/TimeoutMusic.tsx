//import TrackPlayer from 'react-native-track-player';
import RNExitApp from 'react-native-exit-app';
import { Storage } from '../helpers';

export default class TimeoutMusic {

    initTimeout = async (time: number = 30) => {
        try {
            const currentDate = new Date();
            const futureDate = new Date(currentDate.getTime() + time * 60 * 1000);
            return await Storage.store('timeout', {
                timeoutAtived: true,
                storedTimeoutDate: futureDate,
            }, true);
        } catch (e) { return false; }
    }

    getTimeout = async () => {
        try {
            return await Storage.get('timeout', true);
        } catch (e) { return false; }
    }

    checkTimeoutMusic = async () => {
        const timeoutStorage = await Storage.get('timeout', true);
        if (timeoutStorage?.timeoutAtived) {
            const storedTimeoutDate = timeoutStorage?.storedTimeoutDate;
            const currentDate = new Date();

            if (currentDate.getTime() > new Date(storedTimeoutDate).getTime()) {
                //Timeout expired
                await new TimeoutMusic().deleteTimeout();
                //await TrackPlayer.stop(); // stop music
                RNExitApp.exitApp(); // exit app
                return true;
            } else {
                //Timeout not expired
                return false;
            }
        } else {
            return false;
        }
    }

    deleteTimeout = async () => {
        try {
            return await Storage.store('timeout', {
                timeoutAtived: false,
                storedTimeoutDate: null
            }, true);
        } catch (e) { return false; }
    }
}
