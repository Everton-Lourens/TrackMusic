import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Section, Drawer } from '../../widgets';
import { Icon } from '../../components';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const Index = ({ songs }: any) => {
	const [assets] = useAssets([require('@/src/assets/icons/hamburger.png'), require('@/src/assets/icons/search.png')]);
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="favourite" onItemPressed={() => setDrawer(false)}>
						<ImageBackground style={styles.backgroundcontainer} source={{ uri: 'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376252.jpg' }} blurRadius={20} resizeMode="cover">
						<StatusBar style="light" backgroundColor='black' />
			<SafeAreaView style={styles.container}>
				<Header
					options={{
						left: {
							// @ts-ignore
							children: drawer ? <Icon name="x" color="red" /> : <Image source={require('@/src/assets/icons/hamburger.png')} resizeMode="contain" />,
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
		paddingTop: Constants.statusBarHeight,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
