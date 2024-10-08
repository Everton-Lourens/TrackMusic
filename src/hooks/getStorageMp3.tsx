import RNFS from 'react-native-fs';
//import TrackPlayer from 'react-native-track-player';
import { getArtworkImg } from '../store/config';

export async function getAllSongs() {
    let mp3Files: Array<any> = [];

    await getAllFiles(RNFS.ExternalStorageDirectoryPath);

    if (__DEV__ && !mp3Files?.length) {
        mp3Files = [
            {
                id: 1,
                url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986803/GitHub/Projects/Musicont/mock/audios/dance-monkey_disxa8.mp3',
                title: 'Dance Monkey',
                artist: "Tones and I",
                artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/dance-monkey_dht1uv.jpg',
            },
            {
                id: 2,
                url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986838/GitHub/Projects/Musicont/mock/audios/peaches_dzluia.mp3',
                title: 'Peaches',
                artist: 'Justin Bieber',
                artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987767/GitHub/Projects/Musicont/mock/images/peaches_sm4qvm.jpg',
            },
            {
                id: 3,
                url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623988277/GitHub/Projects/Musicont/mock/audios/therefore-i-am_sea49g.mp3',
                title: 'Therefore I Am',
                artist: 'Billie Eilish',
                artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623987985/GitHub/Projects/Musicont/mock/images/therefore-i-am_t9xxfs.jpg',
            },
            {
                id: 4,
                url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623986820/GitHub/Projects/Musicont/mock/audios/kungs-vs-cookin_gbvmhs.mp3',
                title: 'This Girl',
                artist: "Kungs vs Cookin' on 3 Burners",
                artwork: 'https://res.cloudinary.com/jsxclan/image/upload/v1623984884/GitHub/Projects/Musicont/mock/images/kungs-vs-cookin_yhuqv3.jpg',
            },
            {
                id: 5,
                url: 'https://res.cloudinary.com/jsxclan/video/upload/v1623987046/GitHub/Projects/Musicont/mock/audios/heartless_u7exot.mp3',
                title: 'Heartless',
                artist: 'The Weeknd',
                artwork: 'https://img.freepik.com/fotos-premium/foto-de-foco-de-fones-de-ouvido-em-fundo-desfocado-aconchegante-a-noite_980736-3020.jpg',
            },
        ];
    }

    return reverseIdArray(mp3Files); // Last song added first

    function reverseIdArray(oldArray: Array<any>) {
        if (!oldArray?.length) return [];
        const reversedArray = oldArray.reverse().map((item, index) => {
            return { ...item, id: index + 1 };
        });
        return reversedArray;
    }

    async function getAllFiles(directoryPath: string) {
        try {
            const files = await RNFS.readDir(directoryPath);

            if (!files || !files?.length) return;

            for (const file of files) {
                if (file.isFile() && file.name.endsWith('.mp3')) {
                    const alreadyContains = mp3Files.some(obj => obj.url === file.path);
                    if (!alreadyContains) {

                        //const durationMillis = await getDurationMillis(file?.path)
                        //if (!durationMillis) return;

                        const img = getArtworkImg();
                        mp3Files.push({
                            id: mp3Files?.length + 1,
                            url: file.path,
                            title: file.name.replace(/\.[^/.]+$/, '') || 'Sem Título',
                            artist: '',
                            artwork: img,
                            //durationMillis,
                        });
                    }
                } else if (file.isDirectory()) {
                    await getAllFiles(file.path);
                }
            }
        } catch (e) { }
    }
}
