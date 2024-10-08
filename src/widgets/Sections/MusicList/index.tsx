import React, { memo, useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { Card } from '../../../components';
import { DISPATCHES, SCREENS } from '../../../constants';
import { Storage } from '../../../helpers';
//import { getArtworkImg } from '../../../store/config';
import * as Modal from '../../../widgets/Modals';

const Index = ({ song, songs, dispatch, style = {}, audios = [], indicator = true, useIndex = false }: any) => {
	const { navigate } = useNavigation();
	const [favs, setFavs] = useState([]);
	const [playlistModal, setPlaylistModal] = useState(false);
	const [songIndex, setSongIndex] = useState(0);

	const setFavourites = async () => {
		const savedFavs = await Storage.get('favourites', true);
		if (savedFavs !== null) {
			setFavs(savedFavs);
		}

		dispatch({
			type: DISPATCHES.STORAGE,
			payload: {
				favourites: savedFavs,
			},
		});
	};

	const handleAddToFavourite = async (index: any) => {
		const savedFavs = await Storage.get('favourites', true);
		if (savedFavs === null) {
			await Storage.store('favourites', [index], true);
		} else {
			if (savedFavs.includes(index)) {
				const updatedFavs = savedFavs.filter((i: any) => i !== index);
				await Storage.store('favourites', updatedFavs, true);
			} else {
				savedFavs.unshift(index);
				await Storage.store('favourites', savedFavs, true);
			}
		}

		setFavourites();
	};

	const onPlayPress = (song: any, index: any) => {
		// @ts-ignore
		navigate(SCREENS.PLAYING, {
			forcePlay: true,
			song,
			index,
		});
	};

	useEffect(() => {
		setFavourites();
	}, []);

	if (useIndex) {
		return renderRecentlyPlayed()
	} else {
		return renderWithFlatList();
	}

	function renderWithFlatList() {
		return (
			<View style={styles.container}>
				<FlatList
					style={{ ...style }}
					contentContainerStyle={{
						padding: 20,
					}}
					showsVerticalScrollIndicator={indicator}
					data={audios}
					keyExtractor={(item, index) => String(index)}
					renderItem={({ item, index }) => {
						const songIndex = songs.findIndex((i: any) => i?.id === item?.id);

						return (
							<Card.MusicList
								style={song?.detail?.id === item?.id ? { backgroundColor: 'rgba(0, 255, 0, 0.2)' } : {}}
								imageURL={item?.artwork}
								title={item?.title}
								artist={item?.artist || item?.artist}
								duration={item?.durationMillis || 0}
								onPlayPress={() => onPlayPress(item, songIndex)}
								moreOptions={[
									// @ts-ignore
									{
										text: 'Iniciar',
										onPress: () => onPlayPress(item, songIndex),
									},
									// @ts-ignore
									{
										// @ts-ignore
										text: favs.includes(songIndex) ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
										onPress: () => handleAddToFavourite(songIndex),
									},
									// @ts-ignore
									{
										text: 'Adicionar à playlist',
										onPress: () => {
											setPlaylistModal(true);
											setSongIndex(songIndex);
										},
									},
								]}
							/>
						);
					}}
				/>
				<Modal.Playlist visible={playlistModal} onClose={setPlaylistModal} songIndex={songIndex} />
			</View>
		);
	}

	function renderRecentlyPlayed() {
		return (
			<ScrollView
				style={styles.container}
				contentContainerStyle={{
					...style,
					padding: 20,
				}}
				showsVerticalScrollIndicator={indicator}
			>
				{audios.map((index: any, key: any) => (
					<Card.MusicList
						key={key}
						style={song?.detail?.id === songs[index]?.id ? { backgroundColor: 'red' } : {}}
						imageURL={songs[index]?.artwork}
						title={songs[index]?.title}
						artist={songs[index]?.artist}
						duration={songs[index]?.durationMillis || 0}
						onPlayPress={() => onPlayPress(songs[index], index)}
						// @ts-ignore
						moreOptions={[
							// @ts-ignore
							{
								text: 'Iniciar',
								onPress: () => onPlayPress(songs[index], index),
							},
							// @ts-ignore
							{
								// @ts-ignore
								text: favs.includes(index) ? 'Remover dos favoritos' : 'Adicionar aos favoritos',
								onPress: () => handleAddToFavourite(index),
							},
							// @ts-ignore
							{
								text: 'Adicionar à playlist',
								onPress: () => {
									setPlaylistModal(true);
									setSongIndex(index);
								},
							},
						]}
					/>
				))}
				<Modal.Playlist visible={playlistModal} onClose={setPlaylistModal} songIndex={songIndex} />
			</ScrollView>
		);
	}
};

const mapStateToProps = (state: any) => ({ song: state?.player?.currentSong, songs: state?.player?.songs });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));
//export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));
const styles = StyleSheet.create({
	container: {
		flex: 1,
		bottom: 30,
	},
});
