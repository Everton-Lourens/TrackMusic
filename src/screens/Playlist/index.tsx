import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, Image, View, ImageBackgroundBase } from 'react-native';
import { connect } from 'react-redux';
import { Header, Section } from '../../widgets';
import { Storage } from '../../helpers';
import { DISPATCHES } from '@/src/constants';
import LinearGradient from 'react-native-linear-gradient';

const Index = ({ songs, playlists, dispatch, route: { params }, navigation: { goBack } }: any) => {
	const [playlist, setPlaylist] = useState<any>({});

	const deletePlaylist = () => {
		return new Promise<void>(async (resolve) => {
			const newPlaylists = playlists.filter((i: any) => i?.name.toLowerCase() !== playlist?.name.toLowerCase());
			await Storage.store('playlists', newPlaylists, true);

			dispatch({
				type: DISPATCHES.STORAGE,
				payload: {
					playlists: await Storage.get('playlists', true),
				},
			});

			resolve();
		});
	};

	const handleDelete = () => {
		Alert.alert('Lixeira', `Você tem certeza de que deseja excluir a playlist "${playlist?.name}"?`, [
			{
				text: 'Não! Obrigado(a)',
				style: 'cancel',
			},
			{
				text: 'Sim! Por favor',
				onPress: async () => {
					await deletePlaylist();
					goBack();
				},
			},
		]);
	};

	useEffect(() => {
		setPlaylist(playlists[params?.playlistIndex || 0]);
	}, [params]);

	return playlist && Object.keys(playlist).length > 0 ? (
		<>
			<StatusBar barStyle="light-content" backgroundColor='black' />

			<View style={{ flex: 1 }}>
				<ImageBackground style={styles.header} source={{ uri: songs[playlist?.songs[2]].artwork }}>
					<LinearGradient
						style={styles.overlay}
						colors={['rgba(0, 0, 0, 1)', 'transparent']}
						start={{ x: 0, y: 1 }}
						end={{ x: 0, y: 0 }}
					/>
					<Header
						options={{
							left: {
								// @ts-ignore
								children: <Image source={require('@/src/assets/icons/go-back.png')} resizeMode="contain" />,
								onPress: goBack,
							},
							right: {
								// @ts-ignore
								children: <Image source={require('@/src/assets/icons/close-icon.png')} resizeMode="contain" />,
								onPress: handleDelete,
							},
						}}
					/>
					<View style={{ flex: 0.6, justifyContent: 'center', alignItems: 'center' }}>
						<Text style={styles.title} numberOfLines={1}>
							{playlist?.name}
						</Text>
						<Text style={styles.subtitle} numberOfLines={1}>
							{`${playlist?.songs?.length} Músicas`}
						</Text>
					</View>
				</ImageBackground>
			</View>
			<ScrollView style={styles.itemContainer} contentContainerStyle={{ flex: 1 }}>
				<ImageBackground style={styles.item} blurRadius={10} source={{ uri: songs[playlist?.songs[2]].artwork }}>
				<LinearGradient
						style={styles.imageBackground}
						colors={['rgba(0, 0, 0, 1)', 'transparent']}
						start={{ x: 1, y: 0 }}
						end={{ x: 0, y: 1 }}
					/>
					{playlist?.songs && playlist?.songs.length > 0 ? (
						<Section.MusicList audios={playlist?.songs} indicator={false} useIndex={true} />
					) : (
						<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
							<Text style={{ fontSize: 24, fontWeight: 'bold', color: '#C4C4C4' }}>Sem músicas</Text>
						</View>
					)}
				</ImageBackground>
			</ScrollView>
		</>
	) : (
		<></>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player.songs, playlists: state?.storage?.playlists });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Index);

const styles = StyleSheet.create({
	header: {
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height / 3.2,
		paddingTop: StatusBar.currentHeight, // or: paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	item: {
		width: Dimensions.get('screen').width,
		height: Dimensions.get('screen').height*0.7,
	},
	imageBackground: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: null,
		height: Dimensions.get('screen').height*0.7,
	},
	overlay: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		width: null,
		height: Dimensions.get('screen').height / 3.2,
	},
	title: {
		color: '#FFF',
		fontSize: 24,
		fontWeight: '900',
		letterSpacing: 1,
		alignSelf: 'center',
	},
	subtitle: {
		color: '#FFF',
	},
	itemContainer: {
		top: -0,
		height: Dimensions.get('screen').height / 2.5,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: 'black',
	},
});
