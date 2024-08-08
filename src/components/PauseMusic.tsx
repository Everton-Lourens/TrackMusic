import TrackPlayer from 'react-native-track-player';
import RNExitApp from 'react-native-exit-app';
import { Storage } from '../helpers';

var timeClassStorage: number;

export default class TimeoutTrack {
    time: number;
    interval: any | null;
    startTime: number;
    storageTime: number; // Assuming storageTime is provided

    constructor(
        startTime: number = 30, // 30 * 60 @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        time: number = 0, // 30 minutes in seconds
        interval: any = null, // 30 minutes in seconds
        storageTime: number = 0 // Default value for storageTime
    ) {
        this.startTime = startTime;
        this.time = time;
        this.interval = interval;
        this.storageTime = storageTime;

        //this.init();
    }

    /*
    init() {
        // Initialize the timeout
        if (this.storageTime >= 1) {
            this.startTime = this.storageTime;
            this.startTimeout();
        }
    }
    */

    getTimeout = () => {
        return timeClassStorage;
    }

    startTimeout = async (newTime: number = 0) => {
        if (this.interval) clearInterval(this.interval); // Clean up any previous interval

        this.time = (newTime ? newTime : this.startTime) * 60;
        //this.time = timeClassStorage ? timeClassStorage : this.startTime;

        this.interval = setInterval(async () => {
            //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@ setInterval @@@@@@@@@@@@@@@@@@@@@@@@@@@', this.time);
            if (this.time <= 0) {
                clearInterval(this.interval);
                try {
                    //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@ Pausado @@@@@@@@@@@@@@@@@@@@@@@@@@@', timeClassStorage);
                    const timeoutStorage = await Storage.get('timeout', true);
                    if (timeoutStorage?.timeoutAtived && timeoutStorage?.interval === this.interval) {
                        TrackPlayer.pause(); // pause music
                        RNExitApp.exitApp(); // exit app
                    }
                    this.storageTime = 0;
                    timeClassStorage = 0;
                } catch (e) { }
                return this.time;
            }
            this.time = (this.time - 1);
            this.storageTime = this.time;
            timeClassStorage = this.time;
            return this.time;
        }, 1000);
        await Storage.store('timeout', { timeoutAtived: true, interval: this.interval }, true);
    };

    stopTimeout = async () => {
        clearInterval(this.interval);
        await Storage.store('timeout', { timeoutAtived: false, interval: null }, true);
    };

    resetTimeout = async () => {
        await Storage.store('timeout', { timeoutAtived: false, interval: null }, true);
        clearInterval(this.interval);
        this.time = this.startTime;
        this.storageTime = 0;
        this.startTimeout();
    };

}
