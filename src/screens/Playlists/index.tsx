import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAssets } from 'expo-asset';
import { connect } from 'react-redux';

import { Header, Drawer } from '../../widgets';
import { Card, Icon } from '../../components';
import { SCREENS } from '@/src/constants';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

const Index = ({ songs, playlists, navigation }: any) => {
	const [assets] = useAssets([require('@/src/assets/icons/hamburger.png'), require('@/src/assets/icons/search.png')]);
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="playlist" onItemPressed={() => setDrawer(false)}>
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
								text: 'Playlists',
							},
							right: {
								show: false,
							},
						}}
					/>
					{playlists && playlists?.length > 0 ? (
						<ScrollView style={{ flex: 1 }} contentContainerStyle={styles.sections} showsVerticalScrollIndicator={false}>
							{playlists.map((playlist: any, key: any) => (
								<Card.Playlist
									key={key}
									style={styles.item}
									overlayStyle={{ height: 200 }}
									imageURL={songs[playlist?.songs[0]]?.img}
									title={playlist?.name}
									subtitle={`${playlist?.songs.length} Songs`}
									onPress={() => {
										const playlistIndex = playlists.findIndex((i: any) => i?.name.toLowerCase() === playlist?.name.toLowerCase());
										navigation.push(SCREENS.PLAYLIST, { playlistIndex });
									}}
								/>
							))}
						</ScrollView>
					) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold', color: '#C4C4C4' }}>Sem playlist ainda!</Text>
						</View>
					)}
				</SafeAreaView>
			</ImageBackground>
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player.songs, playlists: state?.storage?.playlists });
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
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
		marginTop: Dimensions.get('screen').height * 0.025,
		marginHorizontal: 20,
		paddingBottom: 20,
	},
	item: {
		width: '100%',
		height: 200,
		marginBottom: 20,
	},
});
