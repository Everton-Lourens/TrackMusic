import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';
//import { SafeAreaView } from 'react-native-safe-area-context';

//import { Footer, Header, Section, Drawer } from '@/src/widgets';
//import { Icon } from '@/src/components';
import { getUriPicture } from '@/src/store/config';

const Index = () => {
	//const [drawer, setDrawer] = useState(false);
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');

	useEffect(() => {
		const intervalId = setInterval(() => {
			setUrlImg(getUriPicture || urlImg);
		}, 1000);
		// Cleanup
		return () => clearInterval(intervalId);
	}, []);

	return (
		<View>
			<ImageBackground source={{ uri: urlImg }} style={styles.backgroundcontainer}>
				<StatusBar barStyle="light-content" backgroundColor='black' />

				<View style={styles.container}>
					<ScrollView showsVerticalScrollIndicator={false}>
						<Text>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</Text>
					</ScrollView>
				</View>
			</ImageBackground>
		</View>
	);
};

export default Index;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundcontainer: {
		flex: 1,
		backgroundColor: 'black',
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
