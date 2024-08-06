import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { Header, Section, Drawer } from '../../widgets';
//import { getRandomImg } from '../../store/config';

const Index = ({ songs }: any) => {
	const [drawer, setDrawer] = useState(false);
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');
=======
import { Header, Section, Drawer } from '@/src/widgets';
//import { getRandomImg } from '@/src/store/config';

const Index = ({ songs }: any) => {
	const [drawer, setDrawer] = useState(false);
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee

	return (
		<Drawer active={drawer} current="songs" onItemPressed={() => setDrawer(false)}>

<<<<<<< HEAD
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: urlImg }} blurRadius={20} resizeMode="cover">
=======
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: 'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376252.jpg' }} blurRadius={20} resizeMode="cover">
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
				<StatusBar barStyle="light-content" backgroundColor='black' />

				<SafeAreaView style={styles.container}>
					<Header
						options={{
							left: {
								// @ts-ignore
<<<<<<< HEAD
								children: drawer ? <Image source={require('../../assets/icons/close-icon.png')} resizeMode="contain" /> : <Image source={require('../../assets/icons/hamburger.png')} resizeMode="contain" />,
=======
								children: drawer ? <Image source={require('@/src/assets/icons/close-icon.png')} resizeMode="contain" /> : <Image source={require('@/src/assets/icons/hamburger.png')} resizeMode="contain" />,
>>>>>>> 73d8a8ed2e7dbe33a533724e6ce6b4cfe88565ee
								onPress: () => setDrawer(!drawer),
							},
							middle: {
								show: true,
								text: 'Todas as músicas',
							},
							right: {
								show: false,
							},
						}}
					/>
					<View style={styles.sections}>
						{<Section.MusicList audios={songs} indicator={false} />}
					</View>
				</SafeAreaView>

			</ImageBackground>
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs });
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
