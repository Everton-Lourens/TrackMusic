import React, { memo, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import { Card } from '../../../components';
import { DISPATCHES, SCREENS } from '../../../constants';
import { Storage } from '../../../helpers';
import * as Modal from '../../Modals';

const Index = ({ songs, dispatch, style = {}, audios = [], indicator = true, useIndex = false }: any) => {
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

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{
				...style,
				padding: 20,
			}}
			showsVerticalScrollIndicator={indicator}
		>
			{useIndex
				? audios.map((index: any, key: any) => (
					<Card.MusicList
						key={key}
						imageURL={songs[index]?.img}
						title={songs[index]?.title}
						author={songs[index]?.author}
						duration={songs[index]?.durationMillis}
						onPlayPress={() => onPlayPress(songs[index], index)}
						// @ts-ignore
						moreOptions={[
							// @ts-ignore
							{
								text: 'Play',
								onPress: () => onPlayPress(songs[index], index),
							},
							// @ts-ignore
							{
								// @ts-ignore
								text: favs.includes(index) ? 'Remove from favorite' : 'Add to favorite',
								onPress: () => handleAddToFavourite(index),
							},
							// @ts-ignore
							{
								text: 'Add to playlist',
								onPress: () => {
									setPlaylistModal(true);
									setSongIndex(index);
								},
							},
						]}
					/>
				))
				: audios.map((song: any, key: any) => {
					const index = songs.findIndex((i: any) => i?.id === song?.id);

					return (
						<Card.MusicList
							key={key}
							imageURL={song?.img}
							title={song?.title}
							author={song?.author}
							duration={song?.durationMillis}
							onPlayPress={() => onPlayPress(song, index)}
							moreOptions={[
								// @ts-ignore
								{
									text: 'Play',
									onPress: () => onPlayPress(song, index),
								},
									// @ts-ignore
								{
									// @ts-ignore
									text: favs.includes(index) ? 'Remove from favorite' : 'Add to favorite',
									onPress: () => handleAddToFavourite(index),
								},
										// @ts-ignore
								{
									text: 'Add to playlist',
									onPress: () => {
										setPlaylistModal(true);
										setSongIndex(index);
									},
								},
							]}
						/>
					);
				})}

			<Modal.Playlist visible={playlistModal} onClose={setPlaylistModal} songIndex={songIndex} />
		</ScrollView>
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs });
const mapDispatchToProps = (dispatch: any) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(memo(Index));

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
