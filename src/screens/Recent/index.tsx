import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets';
//import { getArtworkImg } from '../../store/config';

const Index = ({ songs }: any) => {
	const [drawer, setDrawer] = useState(false);
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');

	return (
		<Drawer active={drawer} current="recent" onItemPressed={() => setDrawer(false)}>

			<StatusBar barStyle="light-content" backgroundColor='black' />

			<ImageBackground style={styles.backgroundcontainer} source={{ uri: urlImg }} blurRadius={20} resizeMode="cover">
				<SafeAreaView style={styles.container}>
					<Header
						options={{
							left: {
								// @ts-ignore
								children: drawer ? <Image source={require('../../assets/icons/close-icon.png')} resizeMode="contain" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
								onPress: () => setDrawer(!drawer),
							},
							middle: {
								show: true,
								text: 'Recentes',
							},
							right: {
								show: false,
							},
						}}
					/>
					<View style={styles.sections}>
						{songs && songs.length > 0 ? (
							<Section.MusicList audios={songs} indicator={false} useIndex={true} />
						) : (
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<Text style={{ fontSize: 24, fontWeight: 'bold', color: '#C4C4C4' }}>Sem músicas recentes ainda!</Text>
							</View>
						)}
					</View>
				</SafeAreaView>
			</ImageBackground>
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.storage?.recents });
export default connect(mapStateToProps, null)(Index);

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
