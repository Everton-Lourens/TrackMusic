import React, { useState } from 'react';
import { Dimensions, Image, ImageBackground, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { Header, Section, Drawer } from '../../widgets';
import { Storage } from '../../helpers';
import { DISPATCHES } from '../../constants';
import { getAllSongs } from '../../hooks/getStorageMp3';
import LoadingOverlay from '../../components/LoadingOverlay';
import { Toast } from '../../components/Toast';
//import { getArtworkImg } from '../../store/config';

const Index = ({ songs, dispatch, navigation: { goBack } }: any) => {
	const [drawer, setDrawer] = useState(false);
	const [urlImg, setUrlImg] = useState('https://img.freepik.com/premium-photo/headphones-music-background-generative-ai_1160-3253.jpg');
	const [loading, setLoading] = useState<boolean>(false);
	const [toastVisible, setToastVisible] = useState(false);
	const [messageToast, setMessageToast] = useState('');

	const showToast = (activated = false) => {
		setToastVisible(true);
		setTimeout(() => {
			setToastVisible(false)
			setMessageToast('');
		}, 3000); // duration + animation time
		const message = activated
			? `Atualizado com sucesso!`
			: 'Procurando músicas, aguarde!';
		setMessageToast(message);
	};


	const updateMp3Storage = async () => {
		try {
			setLoading(true);
			showToast(false);
			const newMp3Files = await getAllSongs();
			await Storage.store('mp3Files', newMp3Files, true);
			dispatch({
				type: DISPATCHES.SET_CURRENT_SONG,
				payload: {
					songs: newMp3Files,
				},
			});
			setLoading(false);
			showToast(true);
		} catch (e) {
			setLoading(false);
		}
	}

	const updateMp3Storage_DEFAULT_function = async () => {
		try {
			setLoading(true);
			showToast(false);
			const newMp3Files = await getAllSongs();
			if (newMp3Files?.length > 0) {
				let mp3Files = await Storage.get('mp3Files', true);
				let countSongs = 1;
				const recentlyAddedSongs = newMp3Files.filter(newSong => {
					// @ts-ignore
					if (!mp3Files.some(oldSong => oldSong?.url === newSong?.url)) {
						newSong.id = mp3Files.length + countSongs;
						countSongs++;
						return true; // Returns `true` to include the song in the filtered list
					}
					return false; // Returns `false` to exclude the song from the filtered list
				});

				if (recentlyAddedSongs.length > 0) {

					mp3Files = [...recentlyAddedSongs, ...mp3Files];

					await Storage.store('mp3Files', mp3Files, true);
					dispatch({
						type: DISPATCHES.SET_CURRENT_SONG,
						payload: {
							songs: mp3Files,
						},
					});
				}
			}
			setLoading(false);
			showToast(true);
		} catch (e) {
			setLoading(false);
		}
	}

	return (
		<Drawer active={drawer} current="songs" onItemPressed={() => setDrawer(false)}>

			<ImageBackground style={styles.backgroundcontainer} source={{ uri: urlImg }} blurRadius={20} resizeMode="cover">
				<StatusBar barStyle="light-content" backgroundColor='black' />

				{loading && <LoadingOverlay loading={loading} />}

				<SafeAreaView style={styles.container}>
					<Header
						options={{
							left: {
								children: <Image style={[styles.headerBtn, { tintColor: 'gray', }]} source={require('../../assets/icons/go-back.png')} />,
								onPress: goBack,
							},
							right: {
								children: <Image style={[styles.headerBtn, { tintColor: 'gray', }]} source={require('../../assets/icons/update.png')} />,
								onPress: () => updateMp3Storage(),
							},
							middle: {
								show: true,
								text: 'Todas as músicas',
							},
						}}
					/>
					<View style={styles.sections}>
						{<Section.MusicList audios={songs} indicator={false} />}
					</View>
				</SafeAreaView>

				<Toast
					style={{ bottom: 50 }}
					visible={toastVisible}
					message={messageToast}
					onHide={() => setToastVisible(false)}
					colorGray={true}
				/>

			</ImageBackground>
		</Drawer>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Index);

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
	headerBtn: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		alignSelf: 'flex-end',
		borderRadius: 35,
		bottom: '1%',
		left: '15%',
	},
});
