import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import { get, store } from '@/src/helpers/storage';

const MusicPlayer = () => {
  const [mp3Files, setMp3Files] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await getMyMp3();
      setLoading(false);
    };
    load();
  }, []);

  async function getMyMp3() {
    if (!mp3Files.length) {
      const mp3IsStorage: Array<any> = await get('mp3Files', true);

      if (mp3IsStorage !== null) {
        setLoading(mp3Files.length > 0 ? true : false);
        return setMp3Files(mp3IsStorage);
      } else {
        await getAllSongs();
        return await store('mp3Files', mp3Files, true);
      }
    }
  }

  async function getAllSongs() {
    await getAllFiles();
    setLoading(mp3Files.length > 0 ? true : false);
    return setMp3Files(mp3Files);

    async function getAllFiles() {
      try {
        const files: Array<any> = await RNFS.readDir(RNFS.ExternalStorageDirectoryPath);

        if (!files || !files?.length) return [];

        for (const file of files) {
          if (file.isFile() && file.name.endsWith('.mp3')) {
            const isObjectInArray = mp3Files.some(obj =>
              obj.path === file.path
            );
            if (isObjectInArray) return;
            else mp3Files.push(file);
          }
          else if (file.isDirectory()) {
            // Recurre em diretórios
            await getMp3Files(file?.path);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    async function getMp3Files(directoryPath: any) {
      //directoryPath = '/storage/emulated/0/Music';
      try {
        const files: Array<any> = await RNFS.readDir(directoryPath);

        if (!files || !files?.length) return [];

        for (const file of files) {
          if (file.isFile() && file.name.endsWith('.mp3')) {
            const isObjectInArray = mp3Files.some(obj =>
              obj.path === file.path
            );
            if (isObjectInArray) return;
            else mp3Files.push(file);
          } else if (file.isDirectory()) {
            //console.log(JSON.stringify(file, null, 2));
            await getMp3Files(file.path);
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }



  const playTrack = async (file: any) => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.add({
        id: 'trackId',
        url: file.path,
        title: file.name,
        artist: 'Unknown',
      });
      await TrackPlayer.play();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{ color: 'red', fontSize: 40 }}> ::::: loading ? {loading ? 'true' : 'false'}</Text>

        <Button title="Get" onPress={getMyMp3} />

        {mp3Files ?
          <FlatList
            data={mp3Files}
            keyExtractor={(item) => item.path}
            renderItem={({ item }) => (
              <View>
                <Text style={{ color: 'red', fontSize: 20 }}>{item.name}</Text>
                <Button title="Play" onPress={() => playTrack(item)} />
              </View>
            )}
          /> : null}
      </View>
    );
  }
};

export default MusicPlayer;
