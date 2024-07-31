import { Image, StyleSheet, Text, TouchableOpacity, View, ViewProps, ViewStyle } from 'react-native'
import TrackPlayer, { State, Event, useTrackPlayerEvents } from 'react-native-track-player';
import { Storage } from '@/src/helpers';
import { useEffect, useState } from 'react';

type PlayerControlsProps = {
    style?: ViewStyle
}

type PlayerButtonProps = {
    style?: ViewStyle
    iconSize?: number
}

//export const Shuffle = ({ style }: ViewProps) => {
export const Shuffle = ({ songs, style }: any) => {
    const [shuffle, setShuffle] = useState<any>(null);
    const [newListWhenFinished, setNewListWhenFinished] = useState<boolean>(false);

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            if (newListWhenFinished) {
                await TrackPlayer.pause();
                console.log('A música terminou!>>', shuffle);
                if (shuffle) {
                    await getShuffleSongs();
                } else {
                    await getDefaultList();
                }
                await TrackPlayer.play();
                setNewListWhenFinished(false)
            }
        }
    });

    const onPress = async () => {
        const newShuffle = !shuffle;
        await Storage.store('shuffle', String(newShuffle), false);
        setShuffle(newShuffle);
        setNewListWhenFinished(true);
        console.log('Aguarde a música terminar!>>', newShuffle);
    }

    useEffect(() => {
        if (shuffle === null) {
            (async () => {
                setShuffle(await Storage.get('shuffle', false) == 'true' ? true : false)
                setNewListWhenFinished(true);
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