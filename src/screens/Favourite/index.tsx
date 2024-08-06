import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets';

const Index = ({ songs }: any) => {
const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="favourite" onItemPressed={() => setDrawer(false)}>
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: 'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376252.jpg' }} blurRadius={20} resizeMode="cover">
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
								text: 'Meus Favoritos',
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
								<Text style={{ fontSize: 24, fontWeight: 'bold', color: '#C4C4C4' }}>Sem favoritos ainda!</Text>
							</View>
						)}
					</View>
				</SafeAreaView>
			</ImageBackground>
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.storage?.favourites });
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
