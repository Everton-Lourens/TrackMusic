import { get } from '@/src/helpers/storage';
import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';

const Index = () => {
	const [mp3Files, setMp3Files] = useState<string>();
	async function teste() {
		const mp3IsStorage = await get('mp3Files', true);
		if (mp3IsStorage !== null) {
			setMp3Files(JSON.stringify(mp3IsStorage, null, 2));
		}
	}
	useEffect(() => {
		teste();
	}, [mp3Files]);

	return (
		<View>
			<Text style={{ fontSize: 40, color: 'red', alignSelf: 'center' }}>HoKKKKKKKme Screen</Text>
			<Text style={{ fontSize: 25, color: 'blue', alignSelf: 'center' }}>{mp3Files}</Text>
			<Button title="Go to Detail Screen" onPress={async () => await teste()} />
		</View>
	);
};

export default Index;

