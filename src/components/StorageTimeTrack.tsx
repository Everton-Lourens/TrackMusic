import TrackPlayer from "react-native-track-player";
import { Storage } from "../helpers";

export async function setStorageTimeTrack(position: number | string = 0) {
    try {
        position = Number(position) > 0 ? Number(position) : await TrackPlayer.getPosition();
        const track = await TrackPlayer.getActiveTrack();
        if (track && position) {
            await Storage.store(`position_track_${JSON.stringify(track)}`, position.toString(), false);
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export async function getStorageTimeTrack(skipTo = true) {
    try {
        const position = await TrackPlayer.getPosition();
        const track = await TrackPlayer.getActiveTrack();
        if (track && !position) {
            const position = await Storage.get(`position_track_${JSON.stringify(track)}`, false);
            await Storage.remove(`position_track_${JSON.stringify(track)}`); // reset to not store the position of multiple songs
            skipTo && Number(position) && await TrackPlayer.seekTo(Number(position));
            return Number(position);
        }
        await Storage.remove(`position_track_${JSON.stringify(track)}`); // reset to not store the position of multiple songs
        return 0;
    } catch (error) {
        console.error(error);
        return 0;
    }
}