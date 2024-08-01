import React, { memo, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Container from '../Container';
import { Card } from '@/src/components';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '@/src/constants';
import { getDefaultPicture } from '@/src/store/config';

const Index = ({ favourites, songs, style = {} }: any) => {
	const { navigate } = useNavigation();
	const [audios, setAudios] = useState([]);
	const handlePress = (song: any, index: any) => {
		// @ts-ignore
		navigate(SCREENS.PLAYING, {
			forcePlay: true,
			song,
			index,
		});
	};

	useEffect(() => {
		setAudios(favourites);
	}, [favourites]);

	return (
		audios &&
		audios.length > 0 && (
			<Container style={style} title="Top 10 Favoritos">
				{audios.map((index, key) => (
					<Card.Favourites
						key={key}
						style={[key === 0 && { marginLeft: 20 }]}
						imageURL={songs[index]?.artwork || getDefaultPicture()}
						title={songs[index]?.title}
						artist={songs[index]?.artist}
						onPress={() => handlePress(songs[index], index)}
					/>
				))}
			</Container>
		)
	);
};

const mapStateToProps = (state: any) => ({ songs: state?.player?.songs, favourites: state?.storage?.favourites });
export default connect(mapStateToProps, null)(memo(Index));

const styles = StyleSheet.create({});
