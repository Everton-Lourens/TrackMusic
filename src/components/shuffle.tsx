import { Image, TouchableOpacity } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import { Storage } from '@/src/helpers';
import { useEffect, useState } from 'react';

export const Shuffle = ({ style }: any) => {
    const [oldShuffle, setOldShuffle] = useState<any>(null);
    const [shuffle, setShuffle] = useState<any>(null);

    const onPress = async () => {
        setOldShuffle(shuffle)
        const newShuffle = !shuffle;
        await Storage.store('shuffle', String(newShuffle), false);
        setShuffle(newShuffle);
    }

    useEffect(() => {
        if (shuffle === null) {
            (async () => {
                const storageShuffle = await Storage.get('shuffle', false) == 'true' ? true : false
                setShuffle(storageShuffle)
                setOldShuffle(storageShuffle)
            })();
        }
    }, [shuffle])

    useEffect(() => {
        if (shuffle !== null && shuffle !== oldShuffle) {
            (async () => {
                await TrackPlayer.pause();
                if (shuffle) {
                    await getShuffleSongs();
                } else {
                    await getDefaultList();
                }
                await TrackPlayer.play();
            })();
        }
    }, [shuffle])


    async function getDefaultList() {
        const mp3Files: any = await Storage.get('mp3Files', true);
        await TrackPlayer.setQueue(mp3Files);
        const recents = await Storage.get('recents', true);
        if (recents && recents?.length > 0) {
            await TrackPlayer.skip(recents[0]);
        }
    }

    async function getShuffleSongs() {
        const mp3Files: any = await Storage.get('mp3Files', true);
        //await TrackPlayer.reset(); // reset the queue?
        mp3Files.sort(() => Math.random() - 0.5);
        await TrackPlayer.setQueue(mp3Files);
    }

    return (
        <TouchableOpacity style={style} onPress={async () => await onPress()}>
            {shuffle ?
                <Image style={{ width: 40, height: 40, backgroundColor: 'red' }} source={require('@/src/assets/icons/shuffled.png')} resizeMode="contain" /> :
                <Image style={{ width: 40, height: 40, backgroundColor: 'red' }} source={require('@/src/assets/icons/shuffle.png')} resizeMode="contain" />
            }
        </TouchableOpacity>
    );
}