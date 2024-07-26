import React, { useState } from 'react';
import { Button, Dimensions, Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';
import { Header, Section, Drawer } from '../../widgets';
import { Icon } from '../../components';
import { getRandomImg } from '@/src/store/config';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const Index = ({ songs }: any) => {
	const [assets] = useAssets([require('@/src/assets/icons/hamburger.png'), require('@/src/assets/icons/search.png')]);
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="songs" onItemPressed={() => setDrawer(false)}>

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
		paddingTop: Constants.statusBarHeight,
	},
	sections: {
		flex: 1,
		marginTop: Dimensions.get('screen').height * 0.025,
	},
});
