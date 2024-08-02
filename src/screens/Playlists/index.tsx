import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

import { Header, Drawer } from '../../widgets';
import { Card} from '../../components';
import { SCREENS } from '@/src/constants';

const Index = ({ songs, playlists, navigation }: any) => {
	const [drawer, setDrawer] = useState(false);

	return (
		<Drawer active={drawer} current="playlist" onItemPressed={() => setDrawer(false)}>
			<ImageBackground style={styles.backgroundcontainer} source={{ uri: 'https://img.freepik.com/fotos-gratis/natacao-morta-de-guitarra-eletrica_23-2151376252.jpg' }} blurRadius={20} resizeMode="cover">
			<StatusBar barStyle="light-content" backgroundColor='black' />

				<SafeAreaView style={styles.container}>
					<Header
						options={{
							left: {
								// @ts-ignore
								children: drawer ? <Image source={require('@/src/assets/icons/close-icon.png')} resizeMode="contain" /> : <Image source={require('@/src/assets/icons/hamburger.png')} resizeMode="contain" />,
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
									imageURL={songs[playlist?.songs[0]]?.artwork}
									title={playlist?.name}
									subtitle={`${playlist?.songs.length ===1 ? '1 Música' : playlist?.songs.length} Músicas`}
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
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
