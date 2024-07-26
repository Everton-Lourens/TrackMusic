import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Footer, Header, Section, Drawer } from '@/src/widgets';
import { Icon } from '@/src/components';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { getUriPicture } from '@/src/store/config';

const Index = () => {
	const [drawer, setDrawer] = useState(false);
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');

	useEffect(() => {
		const intervalId = setInterval(() => {
			setUrlImg(getUriPicture || urlImg);
		}, 1000);
		// Cleanup
		return () => clearInterval(intervalId);
	}, []);

	return (
		<Drawer active={drawer} current="home" onItemPressed={() => setDrawer(false)}>
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: urlImg }} blurRadius={20} resizeMode="cover">
				<StatusBar style="light" backgroundColor='black' />

				<SafeAreaView style={styles.container}>
					<Header
						options={{
							left: {
								// @ts-ignore
								children: drawer ? <Icon name="x" color="red" /> : <Image source={require('@/src/assets/icons/hamburger.png')} resizeMode="contain" />,
								onPress: () => setDrawer(!drawer),
							},
						}}
					/>
					<View style={styles.sections}>
						<Section.Explore />
						<Section.Recent style={{ marginTop: 30 }} />
						<Section.Playlist style={{ marginTop: 30 }} />

						<ScrollView>
							<View style={{
								flex: 1,
								marginTop: Dimensions.get('screen').height * 0.025,
							}}>
							</View>
						</ScrollView>

					</View>
					<Footer />
				</SafeAreaView>

			</ImageBackground>
		</Drawer>
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
		paddingTop: Constants.statusBarHeight,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
